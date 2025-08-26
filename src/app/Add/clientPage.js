

    "use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import SideBar from "@/app/Components/SideBar"
export default function ClientAdd({foods}){
 const now = new Date();
 const month = now.getMonth()
 const monthNames = ["January","February","March","April","May","June",
 "July","August","September","October","November","December"];
 const day = now.getDate();
 const [calorieLimit, setCaloriesLimit] = useState(1500)
 const [foodList, setFoodList] = useState(foods) 
 const [mealList, setMealList] = useState([]) 
 const [foodName, setFoodName] = useState("")
 const [tempCalories, setTempCalories] = useState(0)
 const [sideBarToggle, setSideBarToggle] = useState(true)
 const [toggleType, setToggleType] = useState(true)
 const [todayFoodList, setTodayFoodList] = useState([])


 useEffect(()=>{
    console.log(foodList)
    console.log(now)
    console.log("today",todayFoodList)
 },[todayFoodList])

const calculateCalories = () =>{
    let totalCalories = 0
    todayFoodList.forEach((food)=>{
        totalCalories += Number(food.calories) * Number(food.count)
    }) 
    
    if(tempCalories)
        {
            totalCalories += Number(tempCalories)
        }
    return totalCalories
}


const addFromSideBar = (newFood) => {
    setTodayFoodList(prev => {
      const existingIndex = prev.findIndex(item => item.foodName === newFood.foodName);
  
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          count: updated[existingIndex].count + 1
        };
        return updated;
      }
  
      return [...prev, { foodName: newFood.foodName, calories: newFood.calories, count: 1 }];
    });
  };
  
async function postNewFood(){

    let newFood = {foodName : foodName, calories : tempCalories}

    let res = await fetch("/api/add", {
        method : "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body : JSON.stringify(newFood)
    })

    if(res.ok)
        {
            return 1
        }
        else{
            return 0
        }

}

const removeFood  = (index) => {
    setFoodList(prevItems => [
      ...prevItems.slice(0, index),
      ...prevItems.slice(index + 1)
    ]);
}

const removeFromToday = (i) => {
    setTodayFoodList(prev => prev.filter((food,index) => (index !== i)))

}


// const addFromSideBar = (food) =>{
//     setTodayFoodList(array => [...array, {foodName : food.foodName, calories : food.calories}])
// }

 const addCalories = async () =>{
    if(!tempCalories || !foodName)
        {
            return alert("Please input name and calories")
        }
        let result = await postNewFood()
        if(result === 1){
            alert("Successfully added")
        }
        else{
            alert("Error in adding")
            return
        }
      
    setFoodList(prev => [...prev, {foodName : foodName, calories : tempCalories}]) 
    setTempCalories(0)
    setFoodName("") 
}

    return (
        <section>
           <SideBar>
    
        <div className=" w-full flex flex-col items-center gap-y-8">
        
        <div>
            <button 
            className={`${sideBarToggle === true ? "bg-white text-black" : "bg-[#4f46e5]"} py-1 w-[90px] transition duration-300 cursor-pointer`}
            onClick={()=>{setSideBarToggle(true)}}
            >Entree's</button>
            <button className={`${sideBarToggle === false ? "bg-white text-black" : "bg-[#4f46e5]"} py-1 w-[90px] text-center transition duration-300 cursor-pointer`}
            onClick={()=>{setSideBarToggle(false)}}
            >Meal's</button>
        
        </div>


        <div className="flex flex-col w-full">
           

        <div className="flex flex-col w-full">
        {
            sideBarToggle === true ? (
            <div className="flex flex-col items-center gap-y-4"> 
                    <h2 className="mt-[100px] text-4xl">Stored Food's</h2>
                    <div className="flex flex-col w-11/12"> 
            {
                 foodList && foodList.length > 0 ? 
                    (foodList.map((food, i ) => <div key={i} className={`px-3 w-11/12 mx-auto flex justify-between items-center transition-all py-3 duration-300 hover:bg-[rgba(255,255,255,0.3)] border-t border-t-[#4f46e5] ${i === foodList.length - 1 ? "border-b border-b-[#4f46e5]" : "test" } `}>
                     <h3>{food.foodName}</h3>
                        <div className="flex gap-x-2">
                            <button onClick={()=>addFromSideBar(food)} className="bg-green-600 text-white transition-all duration-300 cursor-pointer hover:bg-white hover:text-green-600 w-[50px] py-1 rounded text-xs">Add</button>
                            <button onClick={()=>removeFood(i)} className="bg-red-600 text-white  transition-all duration-300 cursor-pointer hover:bg-white hover:text-red-600 w-[50px] py-1 rounded text-xs">Delete</button>
                        </div>
                     </div>
                    )) 
                        : 
                    (<div className="flex flex-col items-center gap-y-6"><p className="text-center">You have no data</p> <Link className="mx-auto" href={"/Pages/AddFood"}>Add</Link> </div> )
            
            }</div>
            </div>
            ) :

            (
                <div className="flex flex-col items-center gap-y-4">
                <h2 className="mt-[100px] text-4xl">Stored Meals</h2>
                {
                    mealList && mealList.length > 0 ? 
                       (mealList.map((food, i ) => <button className={` mx-auto w-11/12 hover:bg-[rgba(255,255,255,0.3)]  transition-all duration-300 py-3 text-center border-t border-t-[#4f46e5] ${i === mealList.length - 1 ? "border-b border-b-[#4f46e5]" : "test" } `} key={i}>{meal.mealName}</button>)) 
                           : 
                       (<div className="flex flex-col items-center gap-y-6"><p className="text-center">You have no data</p> <Link className="mx-auto" href={"/Pages/AddFood"}>Add</Link> </div> )
               
               }
                </div>
                

            )
        } 
    </div>







            
         </div>
        
        
        
        </div>
        </SideBar>

        <div className="w-full flex justify-center">
        <button 
        className={`${toggleType === true ? "bg-white text-black" : "bg-[#4f46e5]"} py-1 w-[90px] transition duration-300 cursor-pointer`}
        onClick={()=>{setToggleType(true)}}
        >Entree's</button>
        <button className={`${toggleType === false ? "bg-white text-black" : "bg-[#4f46e5]"} py-1 w-[90px] text-center transition duration-300 cursor-pointer`}
        onClick={()=>{setToggleType(false)}}
        >Meal's</button>

        </div>


        <div className="flex items-center justify-around w-full max-w-[1200px] mx-auto">
        
        
       
        <div className="  flex flex-col items-center">
        
       
            <div>
            <h1 className="text-4xl mt-[100px] text-center">Today's Calories</h1>
            <h2 className="text-center text-3xl mt-[35px] mb-[35px] italic"> {monthNames[month]}, {day}</h2>
           <div className="flex gap-x-4 mb-[20px] ">
           
        
           
            <h3 className="text-xl flex gap-x-4">Daily Calorie Limit: {calculateCalories() > calorieLimit ? ( <p className="text-red-600">{calorieLimit}</p>

            ):(
                    <p className="text-green-600">{calorieLimit}</p>
            )}</h3>
           
            <h3 className="text-xl italic">Current Calories {calculateCalories()}</h3>
            </div>
            <div className="flex flex-col">
       

               
                <div className="flex flex-col items-center gap-y-4">
                    <input placeholder="Name of Food" value={foodName} onChange={e => setFoodName(e.target.value)}/>
                    <input placeholder="Calories" value={tempCalories} onChange={e =>  setTempCalories(e.target.value)}/>
                    <button onClick={addCalories}>Submit</button>
                </div>

                
          
            
            
            </div>
        
        
        
        </div>

        </div>
           
           
     
        
        <div className="flex flex-col items-center ">
                    <h2 className="text-3xl mt-[35px] mb-[20px] italic">Food's For The Day</h2>
                    {
                        todayFoodList.length > 0 ? (
                            <div>
                            {
                                todayFoodList.map((food,i)=>(
                                        <div key={i} className="flex justify-between items-center gap-x-4">
                                           
                                            <div className="flex gap-x-4 items-center">
                                            <h3 className="text-xl capitalize">{food.foodName}</h3>
                                            {
                                                food.count > 0 ? (
                                                    <p className="text-xl italic">{food.count}x</p>
                                                ) : (
                                                    ""
                                                )

                                            }
                                            </div> 
                                                <div className="flex gap-x-4">
                                                <button
                                                className="cursor-pointer  text-gray-300 h-[25px] flex items-center m-auto rounded-4xl px-2 text-xl bg-gray-700 hover:text-gray-700 duration-300 hover:bg-white"
                                                onClick={() => {
                                                    let newArray = [...todayFoodList]
                                                    console.log(newArray)
                                                    newArray[i].count -= 1
                                                    newArray = newArray.filter(item => item.count > 0)
                                                    setTodayFoodList(newArray)
                                                  }}
                                                  
                                              >
                                                -
                                              </button>

                                              <button onClick={()=>removeFromToday(i)} className="bg-red-600 text-white  transition-all duration-300 cursor-pointer hover:bg-white hover:text-red-600 px-4 py-1 rounded text-base">Delete</button>
                                       

                                                </div>
                                            
                                        </div>
                                ))
                            }
                            
                            </div>
                        ):(
                                <div>
                                    <p className="text-center">You have no food for today.</p>
                                    <p className="text-center">Input food for the day.</p>
                                </div>
                               
                        )
                    }
                
                
                </div>
         
         </div>
        
        </section>
        
    )
}
