package com.nvisions.solutionsforaccessibility.CustomControl

import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AlertDialog
import androidx.viewpager.widget.PagerAdapter
import com.nvisions.solutionsforaccessibility.R
import kotlinx.android.synthetic.main.custom_control_viewpager_layout.view.*

class ViewPagerAdapter(private val context:Context, private val list:ArrayList<String>): PagerAdapter() {
    override fun instantiateItem(container: ViewGroup, position: Int): Any {
        val inflater = LayoutInflater.from(container.context)
        val view = inflater.inflate(R.layout.custom_control_viewpager_layout, container, false)
        view.textView.text = list[position]
        view.contentDescription = "햄버거 브랜드, " + view.textView.text
                container.addView(view)
                view.setOnClickListener {
            val builder = AlertDialog.Builder(context)
            builder.setMessage(list[position] + " "+ context.getString(R.string.customControl_banner_dialog_text))
            builder.setPositiveButton(R.string.confirm ) {_, _-> }
            builder.create().show()
        }


        return view
    }

    override fun destroyItem(container: ViewGroup, position: Int, `object`: Any) {
        container.removeView(`object` as View?)
    }

    override fun getCount(): Int {
        return list.size
    }

    override fun isViewFromObject(view: View, `object`: Any): Boolean {
        return view == `object`
    }

}