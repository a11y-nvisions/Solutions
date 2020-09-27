package com.nvisions.solutionsforaccessibility.NestedScroll;

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.accessibility.AccessibilityNodeInfo;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.widget.NestedScrollView;

import com.google.android.material.bottomsheet.BottomSheetBehavior;
import com.nvisions.solutionsforaccessibility.R;

public class NestedScrollExampleActivity extends AppCompatActivity {

    private boolean isChecked;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_nested_scroll_example);
        setTitle(getString(R.string.a11ySample));
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        initAccessibilityCheckBox();
    }

    //CheckBox 접근성 초기화
    private void initAccessibilityCheckBox() {

        ImageView checkBox = findViewById(R.id.accessibilityCheckBox);
        checkBox.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                isChecked = !isChecked;
                if (isChecked) {
                    activateAccessibility();
                } else {
                    deactivateAccessiblity();
                }

            }
        });

        checkBox.setAccessibilityDelegate(checkBoxAccessibilityDelegate);


//        LinearLayout checkBox = findViewById(R.id.accessibilityCheckBoxContainer);
//        checkBox.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                isChecked = !isChecked;
//                if (isChecked) {
//                    activateAccessibility();
//                } else {
//                    deactivateAccessiblity();
//                }
//
//            }
//        });
//
//        checkBox.setAccessibilityDelegate(checkBoxAccessibilityDelegate);
    }

    final View.AccessibilityDelegate checkBoxAccessibilityDelegate = new View.AccessibilityDelegate() {

        @Override
        public boolean performAccessibilityAction(View host, int action, Bundle args) {

            if (super.performAccessibilityAction(host, action, args)) {
                return true;
            }
            return false;
        }

        @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
        @Override
        public void onInitializeAccessibilityNodeInfo(View host, AccessibilityNodeInfo info) {
            super.onInitializeAccessibilityNodeInfo(host, info);
            // Avoid that the button description is also spoken
            info.setClassName("android.widget.CheckBox");
            //setCheckable을 적용해야 음성 안내
            info.setCheckable(true);
            info.setChecked(isChecked);
        }
    };

    //접근성 비활성화
    private void deactivateAccessiblity() {

        TextView text1View = findViewById(R.id.text1);
        text1View.setAccessibilityDelegate(null);


        TextView text2View = findViewById(R.id.text2);
        text2View.setAccessibilityDelegate(null);

        ImageView checkBox = findViewById(R.id.accessibilityCheckBox);
        checkBox.setBackgroundResource(R.drawable.unchecked);

    }

    //접근성 활성화
    private void activateAccessibility() {
        TextView text1View = findViewById(R.id.text1);
        text1View.setAccessibilityDelegate(accessibilityDelegate1);

        TextView text2View = findViewById(R.id.text2);
        text2View.setAccessibilityDelegate(accessibilityDelegate2);

        ImageView checkBox = findViewById(R.id.accessibilityCheckBox);
        checkBox.setBackgroundResource(R.drawable.checked);
    }

    //하단 board 확장
    private void expandBottomBoard() {
        final NestedScrollView bottomBoard = findViewById(R.id.bottom_board);
        bottomBoard.post(new Runnable() {
            @Override
            public void run() {
                //아래 코드를 사용해야 작동함. scrollBy나 layoutParams의 높이를 지정하는 것은 효과없음
                final BottomSheetBehavior behavior = BottomSheetBehavior.from(bottomBoard);
                if (behavior.getState() == BottomSheetBehavior.STATE_COLLAPSED) {
                    behavior.setState(BottomSheetBehavior.STATE_EXPANDED);
                }
            }
        });
    }

    //하단 board 확장
    private void collapseBottomBoard() {
        final NestedScrollView bottomBoard = findViewById(R.id.bottom_board);
        bottomBoard.post(new Runnable() {
            @Override
            public void run() {
                //아래 코드를 사용해야 작동함. scrollBy나 layoutParams의 높이를 지정하는 것은 효과없음
                final BottomSheetBehavior behavior = BottomSheetBehavior.from(bottomBoard);
                if (behavior.getState() == BottomSheetBehavior.STATE_EXPANDED) {
                    behavior.setState(BottomSheetBehavior.STATE_COLLAPSED);
                }
            }
        });
    }



    final View.AccessibilityDelegate accessibilityDelegate2 = new View.AccessibilityDelegate() {

        @Override
        public boolean performAccessibilityAction(View host, int action, Bundle args) {
            if (action == AccessibilityNodeInfo.ACTION_ACCESSIBILITY_FOCUS) {
                expandBottomBoard();
            }
            if (super.performAccessibilityAction(host, action, args)) {
                return true;
            }
            return false;
        }

        @Override
        public void onInitializeAccessibilityNodeInfo(View host, AccessibilityNodeInfo info) {
            super.onInitializeAccessibilityNodeInfo(host, info);
            // Avoid that the button description is also spoken
            info.setScrollable(true);
        }
    };


    final View.AccessibilityDelegate accessibilityDelegate1 = new View.AccessibilityDelegate() {

        @Override
        public boolean performAccessibilityAction(View host, int action, Bundle args) {
            if (action == AccessibilityNodeInfo.ACTION_ACCESSIBILITY_FOCUS) {
                collapseBottomBoard();
            }
            if (super.performAccessibilityAction(host, action, args)) {
                return true;
            }
            return false;
        }

        @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
        @Override
        public void onInitializeAccessibilityNodeInfo(View host, AccessibilityNodeInfo info) {
            super.onInitializeAccessibilityNodeInfo(host, info);
            // Avoid that the button description is also spoken
            info.setScrollable(true);

        }
    };
}

