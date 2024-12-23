import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import pic from "../../../assets/eduvantage.png";

const URL = import.meta.env.VITE_PORT_URL

const Chat = ({ messages }) => {
  const location = useLocation();
  const { username, interviewId, vivadata } = location.state || {};
  const navigate = useNavigate();
  const [displayMessages, setDisplayMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [qHistory, setQHistory] = useState([]);
  // const [nos,setnos]=useState("")
  const [c_question, setCurrentQuestion] = useState("");
  const [c_answer, setCurrentAnswer] = useState("");
  const [timer, setTimer] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const API_URL = `${URL}/interviewee/generatefinalreport`;
  const chatContainerRef = useRef(null);

  // console.log(vivadata.questionset); 
  
  // Text-to-speech function
  const speakText = (text, rate = 0.95) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    utterance.rate = rate;
    synth.speak(utterance);
  };

  /*   useEffect(() => {
    setDisplayMessages(messages);
  }, [messages]); */

  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage?.name === "User") {
      handleUserMessage(latestMessage);
    }
  }, [messages]);

  const handleUserMessage = (userMessage) => {
    const messageExists = displayMessages.some(
      (msg) => msg.message === userMessage.message
    );

    if (!messageExists) {
      // Create alert div
      const alertDiv = document.createElement("div");
      alertDiv.setAttribute("role", "alert");

      // Apply CSS via JavaScript
      Object.assign(alertDiv.style, {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "1000",
        width: "80%",
        maxWidth: "500px",
        padding: "16px",
        border: "1px solid #d1d5db", // Gray border
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff", // White background
      });

      // Add content
      alertDiv.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style="width: 24px; height: 24px; margin-right: 8px; stroke: #0284c7;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span style="font-size: 20px; font-weight: 500; color: #1f2937;">
            User said: "${userMessage.message}".   
            Do you accept?
          </span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button style="padding: 8px 16px; background-color: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;" class="deny-btn">
            Deny
          </button>
          <button style="padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;" class="accept-btn">
            Accept
          </button>
        </div>
      `;

      // Append to body
      document.body.appendChild(alertDiv);

      // Add event listeners
      alertDiv.querySelector(".accept-btn").addEventListener("click", () => {
        setDisplayMessages((prev) => [...prev, userMessage]);
        sendMessageToServer(userMessage.message);
        document.body.removeChild(alertDiv);
      });

      alertDiv.querySelector(".deny-btn").addEventListener("click", () => {
        document.body.removeChild(alertDiv);
      });
    }
  };

  const sendMessageToServer = async (userMessage) => {
    try {
      setIsLoading(true);
      setIsTyping(true);

      const response = await axios.get(
        `${URL}/interviewee/getquestion`,
        {
          params: {
            id: interviewId,
            username,
            NOS_count:JSON.stringify(vivadata.NOS_count),
            questionset: JSON.stringify(vivadata.questionset),
            user_input: userMessage,
            q_history: JSON.stringify(qHistory),
            c_question,
            c_answer,
          },
        }
      );
      console.log(response.data);
      
      const { question, answer ,NOS} = response.data;
      setCurrentQuestion(question);
      setCurrentAnswer(answer);
      setQHistory((prev) => [...prev, NOS]);

      if (question) setTimer(vivadata.timer*60); // Start 3-minute countdown

      if (!question) {
        alert("Viva has been completed. Thank you!");
        setRedirect(true);
        return;
      }

      const serverMsg = {
        name: "Admin",
        message: question || "No reply from server",
        avatar:
          "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/vepzg5bphk6heh58vltk",
      };

      speakText(serverMsg.message);
      setDisplayMessages((prev) => [...prev, serverMsg]);

      setIsLoading(false);
      setIsTyping(false);
    } catch (error) {
      console.error("Error sending message to the server:", error);

      const errorMsg = {
        name: "Admin",
        message: "Something went wrong. Please try again later.",
        avatar:
          "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/vepzg5bphk6heh58vltk",
      };

      setDisplayMessages((prev) => [...prev, errorMsg]);
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (redirect) {
      const fetchDataAndNavigate = async () => {
        try {
          await fetch(`${API_URL}?id=${interviewId}&username=${username}`);
          navigate("/viva-end", {});
        } catch (error) {
          console.error("Error during redirection fetch:", error);
        }
      };

      fetchDataAndNavigate();
    }
  }, [redirect, API_URL, interviewId, username, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else if (timer === 0 && c_answer) {
      sendMessageToServer(c_answer);
    }
  }, [timer, c_answer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return {
      minutes,
      seconds: remainingSeconds.toString().padStart(2, "0"),
    };
  };

  const { minutes, seconds } = formatTime(timer);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [displayMessages]);

  return (
    <div
      className="h-[calc(80vh-4rem)] overflow-y-auto p-2"
      ref={chatContainerRef}
    >
      {displayMessages.map((msg, index) => (
        <div
          key={index}
          className={`chat ${msg.name === "User" ? "chat-end" : "chat-start"}`}
        >
          {/* Admin's layout: Avatar first */}
          {msg.name !== "User" && (
            <div className="flex items-start gap-2 mt-2">
              {/* Avatar */}
              <div className="relative -bottom-10 left-0">
              <div className="w-9 h-9 rounded-full flex place-items-center justify-end">
                <img
                  src={msg.avatar || "https://placehold.co/200x200"}
                  alt={`${msg.name} Avatar`}
                  className="w-8 h-8 rounded-full flex flex-end"
                />
              </div>
              </div>
              {/* Chat bubble */}
              <div className="chat-bubble chat-bubble-accent text-2xl text-left w-auto font-serif">
                {msg.message}
              </div>
            </div>
          )}

          {/* User's layout: Message first */}
          {msg.name === "User" && (
            <>
              {/* Chat bubble */}
              <div className="chat-bubble chat-bubble-success text-2xl mt-2 text-right font-serif ">
                {msg.message}
              </div>
              {/* Avatar */}
              <div className="w-9 h-10 rounded-full flex items-center justify-center">
                <img
                  src={msg.avatar || "https://placehold.co/200x200"}
                  alt={`${msg.name} Avatar`}
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </>
          )}
        </div>
      ))}

      {/* Countdown Timer */}
      {timer > 0 && (
        <div className="flex items-start justify-center w-full gap-4 count-down-main mt-4">
          <div className="timer w-24 h-14">
            <div
              className={`py-4 px-2 rounded-lg ${
                timer <= 20 ? "animate-box-bg" : "bg-indigo-600"
              }`}
            >
              <h3
                className={`font-Cormorant font-semibold text-3xl text-center ${
                  timer <= 20 ? "animate-text-color" : "text-white"
                }`}
              >
                {minutes}
              </h3>
            </div>
            <p className="text-lg font-Cormorant font-normal text-gray-900 mt-1 text-center w-full">
              minutes
            </p>
          </div>

          <h3 className="font-manrope font-semibold text-2xl text-gray-900">
            :
          </h3>

          <div className="timer w-24 h-14">
            <div
              className={`py-4 px-2 rounded-lg ${
                timer <= 20 ? "animate-box-bg" : "bg-indigo-600"
              }`}
            >
              <h3
                className={`font-Cormorant font-semibold text-3xl text-center ${
                  timer <= 20 ? "animate-text-color" : "text-white"
                }`}
              >
                {seconds}
              </h3>
            </div>
            <p className="text-lg font-Cormorant font-normal text-gray-900 mt-1 text-center w-full">
              seconds
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
