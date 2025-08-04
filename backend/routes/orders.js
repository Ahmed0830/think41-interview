import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// GET /orders/customer/:userId — All orders of a customer
router.get("/customer/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      return res
        .status(500)
        .json({ error: "Failed to fetch orders", details: error.message });
    }

    res.json({ orders: data });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Unexpected server error", details: err.message });
  }
});

// GET /orders/:orderId — Get specific order
router.get("/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("order_id", orderId)
      .single();

    if (error || !data) {
      return res
        .status(404)
        .json({ error: "Order not found", details: error?.message });
    }

    res.json({ order: data });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Unexpected server error", details: err.message });
  }
});

export default router;
