"use client"
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientMap({maps = []}){
    const [newMap, setNewMap] = useState({
        mapId: uuidv4(),
        mapName: "",
        isControl: false,
        isHp: false,
        isSnd: false,
        isCollapsible : false
      });
    const [mapList, setMapList] = useState(maps);
    const [addMapLoading, setAddMapLoading] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null); // stores the map to delete
    
    async function addMap() {  
        setAddMapLoading(true);
        const res = await fetch(`/api/cod/map`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMap),
        });
        
        if(res.ok){
          const data = await res.json();
          setMapList((prev) => [...prev, data.newMap]);
          setNewMap({
            mapId: uuidv4(),
            mapName: "",
            isControl: false,
            isHp: false,
            isSnd: false,
            isCollapsible : false
          });
        }
        setAddMapLoading(false);
      }

      

    const handleDeleteClick = (map) => {
        
      setDeleteConfirm(map);
     
    };

    const confirmDelete = async () => {
      if (!deleteConfirm) return;
      
      let deleteMap = {...deleteConfirm, isActive : false}
      const res = await fetch(`/api/cod/map`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleteMap),
      });
      if(res.ok){
          alert("Map Deleted")
      }
      
      setMapList((prev) => prev.filter(map => map.mapId !== deleteConfirm.mapId));
      setDeleteConfirm(null);
    };

    const cancelDelete = () => {
      setDeleteConfirm(null);
    };

    return (
      <section className="flex flex-col lg:flex-row gap-6 p-6 relative">
        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                className="fixed top-34 left-0 w-full h-full  [background:rgba(0,0,0,0.5)] backdrop-blur-sm z-40"
                onClick={cancelDelete}
              />
              
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded-2xl shadow-2xl z-50 w-11/12 max-w-md border border-gray-700"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  Delete Map?
                </h3>
                <p className="text-gray-300 mb-4">
                  Are you sure you want to delete <span className="font-semibold text-blue-400">"{deleteConfirm.mapName}"</span>? This action cannot be undone.
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={cancelDelete}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 transition py-2 px-4 rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700 transition py-2 px-4 rounded-lg font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Create Map Form */}
        <div className="h-fit w-full lg:w-1/2 flex flex-col gap-y-4 bg-gray-800 p-6 rounded-2xl shadow-lg max-w-md">
          <h2 className="text-xl font-semibold text-blue-500 mb-2 text-center uppercase tracking-wide">
            Create New Map
          </h2>
          <input
            className="bg-gray-700 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 text-white"
            placeholder="Input map name"
            value={newMap.mapName}
            onChange={(e) => setNewMap({ ...newMap, mapName: e.target.value })}
          />

          <div className="flex gap-x-2">
            <button
              className={`w-1/3 py-2 rounded-md transition font-semibold ${
                newMap.isControl ? "bg-blue-700" : "bg-gray-700 hover:bg-blue-700"
              }`}
              onClick={() => setNewMap({ ...newMap, isControl: !newMap.isControl })}
            >
              Control
            </button>
            <button
              className={`w-1/3 py-2 rounded-md transition font-semibold ${
                newMap.isHp ? "bg-blue-700" : "bg-gray-700 hover:bg-blue-700"
              }`}
              onClick={() => setNewMap({ ...newMap, isHp: !newMap.isHp })}
            >
              HP
            </button>
            <button
              className={`w-1/3 py-2 rounded-md transition font-semibold ${
                newMap.isSnd ? "bg-blue-700" : "bg-gray-700 hover:bg-blue-700"
              }`}
              onClick={() => setNewMap({ ...newMap, isSnd: !newMap.isSnd })}
            >
              SND
            </button>
          </div>

          <button
            className={`bg-blue-700 hover:bg-blue-800 transition py-2 rounded-md font-semibold mt-2 ${addMapLoading || !newMap.mapName.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => { addMap()}}
            disabled={addMapLoading || !newMap.mapName.trim()}
          >
            {addMapLoading ? "Adding Map..." : "Submit"}
          </button>
        </div>

        {/* Map List */}
        <div className="flex-1 w-full">
          <h2 className="text-2xl font-bold text-blue-500 mb-4 uppercase tracking-wide">
            Map List ({mapList.length})
          </h2>
          
          <AnimatePresence mode="popLayout">
            {mapList.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-400 text-center py-8"
              >
                No maps yet. Create your first map!
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mapList.map((map, index) => (
                  <motion.div
                    key={map.mapId}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -100 }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.05,
                      layout: { duration: 0.3 }
                    }}
                    className="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-white">
                        {map.mapName}
                      </h3>
                      <button
                        onClick={() => handleDeleteClick(map)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900 hover:bg-opacity-20 p-1 rounded transition"
                        aria-label="Delete map"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap">
                      {map.isOverload && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-3 py-1 bg-blue-700 rounded-full text-xs font-semibold"
                        >
                          Overload
                        </motion.span>
                      )}
                      {map.isHp && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 }}
                          className="px-3 py-1 bg-green-700 rounded-full text-xs font-semibold"
                        >
                          HP
                        </motion.span>
                      )}
                      {map.isSnd && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="px-3 py-1 bg-purple-700 rounded-full text-xs font-semibold"
                        >
                          SND
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    )
}