import { saveAs } from "file-saver";

const DownloadComponentContent = ({ content, filename = "feedback.pdf" }) => {
  const handleDownload = () => {
    const blob = new Blob([content], { type: "text" });
    saveAs(blob, filename);
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mt-4"
    >
      Download Feedback
    </button>
  );
};

export default DownloadComponentContent;
