package com.nvisions.solutionsforaccessibility.LayerFocus

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.nvisions.solutionsforaccessibility.R
import kotlinx.android.synthetic.main.activity_layer_focus_bad.*

class LayerFocusBadActivity : AppCompatActivity() {
    val titleArray = arrayOf("과일", "스포츠", "알파벳", "음식")
    val contentArray = arrayOf(arrayOf("사과", "귤", "자몽", "포도"), arrayOf("축구", "농구", "배구", "수영"), arrayOf("A", "B", "C", "D"), arrayOf("잡채", "호떡", "갈비", "전"))
    lateinit var baseRViewAdapter: LayerFocusBaseAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_layer_focus_bad)
        init()
    }

    private fun init(){
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        setTitle(getString(R.string.newLayer_bad))
        baseRView.layoutManager = androidx.recyclerview.widget.LinearLayoutManager(
                this, RecyclerView.VERTICAL, false
        )
        baseRViewAdapter = LayerFocusBaseAdapter(this, titleArray)
        baseRView.adapter = baseRViewAdapter
        baseRViewAdapter.itemClickListener = object : LayerFocusBaseAdapter.OnItemClickListener {
            override fun OnItemClick(holder: LayerFocusBaseAdapter.ViewHolder, view: View, position: Int) {
                newLayout.visibility = View.VISIBLE
                rView.adapter = LayerFocusHorizontalAdapter(this@LayerFocusBadActivity, contentArray[position])
                layerTitle.text = titleArray[position]
            }
        }

        rView.layoutManager = androidx.recyclerview.widget.LinearLayoutManager(
                this, RecyclerView.HORIZONTAL, false
        )

        button.setOnClickListener {
            newLayout.visibility = View.INVISIBLE
        }
    }
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if(item.itemId == android.R.id.home){
            finish()
        }
        return super.onOptionsItemSelected(item)
    }
}