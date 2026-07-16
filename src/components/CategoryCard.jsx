import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function CategoryCard({ category, onDelete }) {
  return (
    <Card className="bg-[#f4f9fe]">
        

      <CardContent className="p-5 ">

        <h2 className="text-2xl font-bold">
          {category.name}
        </h2>

        <p className="text-gray-600 mt-2">
          {category.description}
        </p>

        <p className="mt-2 text-sm">
          Slug :
          <span className="font-semibold ml-2">
            {category.slug}
          </span>
        </p>

        <div className="flex gap-3 mt-5">

          <Link
            to={`/edit-category/${category._id}`}
          >
            <Button>
              Edit
            </Button>
          </Link>

          <Button
            variant="destructive"
            onClick={() => onDelete(category._id)}
          >
            Delete
          </Button>

        </div>

      </CardContent>

    </Card>
  );
}

export default CategoryCard;