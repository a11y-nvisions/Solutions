package com.nvisions.solutionsforaccessibility.CustomControl

import android.os.Bundle
import android.util.Log
import android.view.MenuItem
import android.view.View
import android.view.accessibility.AccessibilityManager
import android.view.accessibility.AccessibilityNodeInfo
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.accessibility.AccessibilityNodeInfoCompat
import com.nvisions.solutionsforaccessibility.R
import kotlinx.android.synthetic.main.custom_control_good_activity.*
import java.util.*
import kotlin.concurrent.timer


class CustomControlGoodActivity : AppCompatActivity() {
    private var count:String = "1"
    private var type:String = "단품"
    private val pagerList = arrayListOf("맥도날드", "롯데리아", "KFC")
    private var currentPage = 0
    private lateinit var timer:Timer
    private var timerStat = false
    private lateinit var adapter: ViewPagerAdapter


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.custom_control_good_activity)
        init()
    }

    fun init(){
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        setTitle(getString(R.string.customControl_good))
        initAdapter()
//        if (isTalkBackEnabled()){
            initAccessibility()
//        }
        initListener()

    }

    private fun isTalkBackEnabled(): Boolean {
        val accessibilityManager = getSystemService(ACCESSIBILITY_SERVICE) as AccessibilityManager
        val isAccessibilityEnabled = accessibilityManager.isEnabled
        val isExploreByTouchEnabled = accessibilityManager.isTouchExplorationEnabled
        return isAccessibilityEnabled && isExploreByTouchEnabled
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if(item.itemId == android.R.id.home){
            finish()
        }
        return super.onOptionsItemSelected(item)
    }

    private fun initAccessibility(){
        editText.accessibilityLiveRegion = View.ACCESSIBILITY_LIVE_REGION_NONE

        editText.accessibilityDelegate = object : View.AccessibilityDelegate() {
            override fun onInitializeAccessibilityNodeInfo(host: View?, info: AccessibilityNodeInfo?) {
                super.onInitializeAccessibilityNodeInfo(host, info)
                info?.isEnabled = false
            }
        }
        swipeButton.accessibilityDelegate = object : View.AccessibilityDelegate(){
            override fun addExtraDataToAccessibilityNodeInfo(host: View, info: AccessibilityNodeInfo, extraDataKey: String, arguments: Bundle?) {
                super.addExtraDataToAccessibilityNodeInfo(host, info, extraDataKey, arguments)
                info?.className = Button::class.java.name
            }
        }

        swipeButton.setOnClickListener {
            if (isTalkBackEnabled()) {
                Toast.makeText(applicationContext, "clicked", Toast.LENGTH_LONG).show()
                completeOrder()
            }
        }

        timer.cancel()

        buttonLeft.visibility = View.VISIBLE
        buttonRight.visibility = View.VISIBLE

        buttonLeft.setOnClickListener {
            currentPage--
            if (currentPage <= -1) {
                currentPage = 2
            }
            viewPager.setCurrentItem(currentPage, true)
            it.announceForAccessibility(pagerList[currentPage])
        }

        buttonRight.setOnClickListener {
            currentPage++
            if (currentPage >= 3) {
                currentPage = 0
            }
            viewPager.setCurrentItem(currentPage, true)
            it.announceForAccessibility(pagerList[currentPage])
        }


        bannerButton.visibility = View.VISIBLE
        bannerButton.setOnClickListener {
            if(!timerStat){ //배너 정지된 상태
                //배너 플레이
                timer = timer(period = 5000, initialDelay = 5000){
                    runOnUiThread {
                        if (currentPage == 3) {
                            currentPage = 0
                        }
                        viewPager.setCurrentItem(currentPage++, true)
                    }
                }

                bannerButton.text = getString(R.string.customControl_banner_stop)
                timerStat = true
            }
            else{ //배너 플레이되고있는 상태
                //배너 정지
                timer.cancel()
                bannerButton.text = getString(R.string.customControl_banner_play)
                timerStat = false

            }
        }



        ViewCompat.replaceAccessibilityAction(editText, AccessibilityNodeInfoCompat.AccessibilityActionCompat.ACTION_ACCESSIBILITY_FOCUS, "") { view, arguments ->
            editText.hint = getString(R.string.customControl_edittext_hint)
            false
        }
//        ViewCompat.replaceAccessibilityAction(viewPager, AccessibilityNodeInfoCompat.AccessibilityActionCompat.ACTION_ACCESSIBILITY_FOCUS, "롤링 배너 실행", null)

    }

    private fun initListener() {
        buttonDown.setOnClickListener {
            val num = Integer.parseInt(editText.text.toString()) - 1
            editText.setText(num.toString())
            if (num == 1) {
                buttonDown.isEnabled = false
            }
            editText.announceForAccessibility("수량 " + num.toString())
        }
        buttonUp.setOnClickListener {
            val num = Integer.parseInt(editText.text.toString()) + 1
            editText.setText(num.toString())
            if (num == 2) {
                buttonDown.isEnabled = true
            }
            editText.announceForAccessibility("수량 " + num.toString())
        }

        swipeButton.setOnStateChangeListener {
            completeOrder()
        }
    }

    private fun completeOrder(){
        count = editText.text.toString()
        type = ""
        when(radioButton.getStateSelected()){
            1 -> {//단품
                type = getString(R.string.customControl_radio_single)
            }
            2 -> {//세트
                type = getString(R.string.customControl_radio_set)
            }
        }

        val str = "햄버거 " + count + "개 " + type + " 주문 완료"
        Toast.makeText(applicationContext, str, Toast.LENGTH_LONG).show()
        val builder = AlertDialog.Builder(this)
        builder.setMessage(str)
        builder.setPositiveButton(R.string.confirm) { _, _->
            count = "1"
            type = getString(R.string.customControl_radio_single)
            editText.setText("1")
            radioButton.setStateSelected(1)
            buttonDown.isEnabled = false
        }
        builder.create().show()
    }

    private fun initAdapter(){
        adapter = ViewPagerAdapter(this, pagerList)
        viewPager.adapter = adapter

//        val handler = Handler()
//        val update = Runnable {
//            if (currentPage >= 3) {
//                currentPage = 0
//            }
//            viewPager.setCurrentItem(currentPage++, true)
//        }

        timer = timer(period = 5000){
            runOnUiThread {
                if (currentPage == 3) {
                    currentPage = 0
                }
                viewPager.setCurrentItem(currentPage++, true)
            }
        }

    }




}


//class MainActivity : AppCompatActivity() {
//    override fun onCreate(savedInstanceState: Bundle?) {
//        super.onCreate(savedInstanceState)
//        setContentView(R.layout.activity_main)
//        initEditText()
//    }
//
//    private fun initEditText() {
//        val editText = findViewById<EditText>(R.id.typeMessage)
//        val reset = findViewById<Button>(R.id.reset)
//        reset.setOnClickListener { v ->
//            editText.setHint(R.string.typeMessage)
//            val resetHint = getString(R.string.hintReset)
//            v.announceForAccessibility(resetHint)
//        }
//        ViewCompat.replaceAccessibilityAction(editText, AccessibilityNodeInfoCompat.AccessibilityActionCompat.ACTION_ACCESSIBILITY_FOCUS, "") { view, arguments ->
//            editText.setHint(R.string.talkBackHint)
//            false
//        }
//    }
//}

