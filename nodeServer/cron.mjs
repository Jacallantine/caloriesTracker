import cron from "node-cron";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jaredcallantine1@gmail.com", 
    pass: "cfcq zvlr jhen mtcb",   
  },
});

async function sendSMS(message) {
    await transporter.sendMail({
      from: "jaredcallantine1@gmail.com",
      to: "jaredcallantine1@gmail.com", 
      subject: "",
      text: message,
    });
    console.log("✅ SMS sent:", message);
  
}

// Scheduled job, every 10 seconds
const task = cron.schedule("*/10 * * * * *", async () => {
  const message = `Hello! Cron triggered at ${new Date().toLocaleTimeString()}`;
  console.log("⏰ Cron running:", new Date().toLocaleTimeString());
  await sendSMS(message);
}, { scheduled: false });

// CLI control
const action = process.argv[2];
switch (action) {
  case "start":
    task.start();
    console.log("🚀 Cron started");
    break;
  case "stop":
    task.stop();
    console.log("🛑 Cron stopped");
    break;
  case "runOnce":
    console.log("⚡ Running once:", new Date().toLocaleTimeString());
    (async () => {
      await sendSMS(`Hello! Cron triggered once at ${new Date().toLocaleTimeString()}`);
    })();
    break;
  default:
    console.log("❌ Unknown action (use start/stop/runOnce)");
}
