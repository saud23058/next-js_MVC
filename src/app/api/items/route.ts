import { fetchAllData } from "@/controllor/itemsControllor";
import { addItem, Items } from "@/model/ItemsModel";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
  try {
    const items: Items[] = fetchAllData();
    return NextResponse.json(items, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch items" },
      { status: 404 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Item name is required." },
        { status: 400 }
      );
    }

    const newItem = addItem(name);

    return NextResponse.json(
      { message: "Successfully added task", item: newItem },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to add item" },
      { status: 500 }
    );
  }
}
