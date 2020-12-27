package com.nvisions.solutionsforaccessibility.LayerFocus

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.nvisions.solutionsforaccessibility.R
import kotlinx.android.synthetic.main.activity_layer_focus_list_row.view.*

class LayerFocusBaseAdapter (val context: Context, val items: Array<String>) : RecyclerView.Adapter<LayerFocusBaseAdapter.ViewHolder>() {
    interface OnItemClickListener{
        fun OnItemClick(holder: LayerFocusBaseAdapter.ViewHolder, view:View, position: Int)
    }
    var itemClickListener :OnItemClickListener? = null
    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        var contentText: TextView

        init {
            contentText = itemView.findViewById(R.id.contentText)
            itemView.setOnClickListener {
                itemClickListener?.OnItemClick(this, it, adapterPosition)
            }
        }
    }

    override fun getItemCount(): Int {
        return items.size
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.activity_layer_focus_list_row, parent, false)
        return ViewHolder(v)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        if (holder is ViewHolder) {
            holder.contentText.text = items[position]
        }
    }
}