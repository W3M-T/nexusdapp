import { createAsyncThunk } from "@reduxjs/toolkit";
import { getNfts } from "../../services/rest/axiosEldron";
import { INft } from "../types/tokens.interface";

export const fetchNfts = createAsyncThunk(
  "tokens/fetchNfts",
  async (address: string) => {
    const res = await getNfts(address);
    const data: INft[] = res.data;
    return data;
  }
);
