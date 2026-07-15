import { Button } from "@/components/ui/button";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex justify-center gap-3 mt-10">

      <Button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
      >
        Previous
      </Button>

      <span className="font-bold mt-2">
        {currentPage} / {totalPages}
      </span>

      <Button
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
      >
        Next
      </Button>

    </div>
  );
}

export default Pagination;