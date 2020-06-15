package com.nvisions.solutionsforaccessibility


import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.nvisions.solutionsforaccessibility.recyclerview.ITEMS
import com.nvisions.solutionsforaccessibility.recyclerview.ItemViewHolder
import com.nvisions.solutionsforaccessibility.recyclerview.ItemsAdapter
import kotlinx.android.synthetic.main.activity_recycler_view_focus.focus_recycler_view
import kotlinx.android.synthetic.main.activity_recycler_view_focus.lost_focus_recycler_view

class RecyclerViewFocusActivity : AppCompatActivity(R.layout.activity_recycler_view_focus) {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        lost_focus_recycler_view.adapter = ItemsAdapter()
                .apply {
                    setDeleteMode(deleteMode = true, modifyFocus = false)
                    setItems(ITEMS)
                }
        focus_recycler_view.adapter = ItemsAdapter { position ->
            focus_recycler_view.findViewHolderForAdapterPosition(position) as? ItemViewHolder
        }
                .apply {
                    setDeleteMode(deleteMode = true, modifyFocus = true)
                    setItems(ITEMS)
                }
    }
}
