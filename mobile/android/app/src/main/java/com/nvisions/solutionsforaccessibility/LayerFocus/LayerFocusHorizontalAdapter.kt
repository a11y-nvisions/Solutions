package com.nvisions.solutionsforaccessibility.LayerFocus

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.nvisions.solutionsforaccessibility.R

class LayerFocusHorizontalAdapter (val context: Context, val items: Array<String>) : RecyclerView.Adapter<LayerFocusHorizontalAdapter.ViewHolder>() {

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        var contentText: TextView
        init {
            contentText = itemView.findViewById(R.id.contentText)
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

