import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const modelType = searchParams.get("type") || "TextualInversion";
  const limit = searchParams.get("limit") || "3";

  const url = `https://civitai.com/api/v1/models?limit=${limit}&types=${modelType}`;
  const apiKey = process.env.CIVITAI_API_KEY;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
