import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BackButton() {

  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="
        flex
        items-center
        gap-2
        mb-6
        text-[#8c3b24]
        font-semibold
        hover:text-[#71301d]
        transition
      "
    >
      <ArrowLeft size={20} />
      Go Back
    </button>
  );
}

export default BackButton;