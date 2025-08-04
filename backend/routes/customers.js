import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// GET /customers?limit=10&offset=0
router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .range(offset, offset + limit - 1);

  if (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch customers", details: error.message });
  }

  res.json({ customers: data });
});

// GET /customers/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Fetch customer details
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (userError || !user) {
      return res
        .status(404)
        .json({ error: "Customer not found", details: userError?.message });
    }

    // 2. Fetch order count
    const { count, error: countError } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("user_id", id);
    console.log(count);
    if (countError) {
      return res
        .status(500)
        .json({ error: "Failed to count orders", details: countError.message });
    }

    // 3. Return both
    res.json({
      customer: user,
      orderCount: count || 0,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Unexpected server error", details: err.message });
  }
});

export default router;
