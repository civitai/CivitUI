/**
 * We're only using the REST API in development for users to run CivitUI in their local environment.
 * CivitUI in production will use MeiliSearch to fetch models.
 */

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const modelType = searchParams.get("type") || "TextualInversion";
  const limit = searchParams.get("limit") || "3";
  const sort = searchParams.get("sort") || "Most Downloaded";
  const period = searchParams.get("period") || "AllTime";

  const url = `https://civitai.com/api/v1/models?limit=${limit}&types=${modelType}&sort=${sort}&period=${period}`;
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
    console.log("Models API data:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
