import React, { useState, useRef, useEffect } from "react";
import { IoMic, IoMicOff } from "react-icons/io5";
import pic from "../../../assets/eduvantage.png";

function Meet({ addUserMessage }) {
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false); // To track if the camera has started
  const [interviewStarted, setInterviewStarted] = useState(false); // To track if the interview has started
  const [transcript, setTranscript] = useState(""); // To store the transcript
  const recognitionRef = useRef(null); // Reference for SpeechRecognition
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null); // To store media stream for easy stopping

  useEffect(() => {
    if (micOn) {
      startRecognition();
    } else {
      stopRecognitionAndSend();
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, [micOn]);

  const startRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript((prev) => prev + " " + finalTranscript);
    };

    recognition.onerror = (event) =>
      console.error("Speech recognition error:", event.error);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopRecognitionAndSend = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (transcript.trim()) {
      addUserMessage(transcript.trim());
      setTranscript("");
    }
  };

  const toggleMic = () => setMicOn(!micOn);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      mediaStreamRef.current = mediaStream;
      videoRef.current.srcObject = mediaStream;
      setCameraStarted(true);
      setVideoOn(true);
    } catch (error) {
      alert("Unable to access camera: " + error.message);
    }
  };

  const toggleVideoDisplay = () => {
    setVideoOn(!videoOn); // This only hides/shows the video, doesn't stop the camera
  };

  const endMeeting = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setMicOn(false);
    setVideoOn(false);
    setCameraStarted(false);
    setTranscript("");
    addUserMessage("end");
  };

  const handleStartClick = () => {
    if (!cameraStarted) {
      startCamera(); // Start the camera
    }
    setInterviewStarted(true); // Mark the interview as started
    addUserMessage("start");
  };

  return (
    <div className="flex-col items-center justify-center p-10 mr-10 mt-3 bg-gray-100 rounded-lg shadow-md w-full max-w-md ">
      
      {/* Admin Image */}
      <div className="bg-white shadow-md border border-blue-400 rounded-md w-full">
        <figure className="flex justify-center">
          <img
            src={pic}
            alt="Admin"
            className="w-64 h-52 object-cover rounded-md"
          />
        </figure>
      </div>

      {/* Video Section */}
      <div className="bg-white shadow-md border border-blue-400 rounded-md mt-5 w-full">
        <figure className="w-100 h-52 border border-gray-200 rounded-md overflow-hidden flex items-center justify-center bg-gray-100">
          {/* Video */}
          <video
            ref={videoRef}
            autoPlay
            muted
            className={`w-full  h-full object-cover ${videoOn ? "block" : "hidden"}`}
          />
          {/* Placeholder Text */}
          {!videoOn && (
            <h3 className="text-gray-500 font-medium text-center">
              Your video will be displayed here
            </h3>
          )}
        </figure>
      </div>

      {/* Controls */}
      <div className="flex justify-around items-center pt-4 mt-4 w-full">
        {!interviewStarted && (
          <button
            onClick={handleStartClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-pink-600"
            disabled={cameraStarted} // Disable button once the camera has started
          >
            Start Interview
          </button>
        )}

        <button
          onClick={toggleMic}
          className={`flex items-center p-2 rounded-md shadow-md ${
            micOn ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          {micOn ? (
            <>
              <IoMic size={24} />
              <span className="ml-2">Stop Answering</span>
            </>
          ) : (
            <>
              <IoMicOff size={24} />
              <span className="ml-2">Start Answering</span>
            </>
          )}
        </button>
      </div>
      </div>
  );
}

export default Meet;
