import { createAsyncThunk } from "@reduxjs/toolkit";
import { INft } from "../../redux/types/tokens.interface";
import { getNfts } from "../services/rest/axiosEldron";

export const fetchNfts = createAsyncThunk(
  "tokens/fetchNfts",
  async (address: string) => {
    const res = await getNfts(address);
    const data: INft[] = res.data;
    return data;
  }
);
