"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print cursor-pointer rounded-[9px] border-none bg-[#064e3b] px-[18px] py-[10px] text-[13px] font-semibold text-white"
    >
      ⤓ Download PDF
    </button>
  );
}
