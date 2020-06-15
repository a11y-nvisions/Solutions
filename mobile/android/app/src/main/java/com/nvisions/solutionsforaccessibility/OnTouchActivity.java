package com.nvisions.solutionsforaccessibility;

import android.content.Context;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class OnTouchActivity extends AppCompatActivity {
    boolean downTouch = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_on_touch);



        Button button = (Button)findViewById(R.id.button);

        button.setOnTouchListener(new View.OnTouchListener(){
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if(event.getAction() == MotionEvent.ACTION_DOWN)
                {
                    downTouch = true;
                    return true;
                }
                if(event.getAction() == MotionEvent.ACTION_UP) {
                    Button button = (Button) findViewById(R.id.button);
                    downTouch = false;
                    button.performClick();
                    return true;
                }


                //}

                return false;
            }
        });
    }

    public class Touchev extends View {
        public Touchev(Context context) {
            super(context);
        }

        @Override
        public boolean performClick() {
            super.performClick();
            return true;
        }
    }


    public void Hide(){
        final LinearLayout viewApple = (LinearLayout) findViewById(R.id.viewApple);
        final Button button = (Button)findViewById(R.id.button);
        final Button button2 = (Button)findViewById(R.id.button2);
        button.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_NO_HIDE_DESCENDANTS);
        button2.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_NO_HIDE_DESCENDANTS);
        viewApple.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);
        viewApple.setVisibility(View.VISIBLE);
        button.setVisibility(View.GONE);
        button2.setVisibility(View.GONE);
    }
    public void onApple(View view) {
        //implement
        final TextView text = (TextView)findViewById(R.id.textView2);

        Hide();
        view.announceForAccessibility("사과입니다");
        text.setText("사과입니다");

    }

    public void onBanana(View view) {
        //implement
        final TextView text = (TextView)findViewById(R.id.textView2);

        Hide();
        view.announceForAccessibility("바나나입니다");
        text.setText("바나나입니다");

    }

    public void onBack(View view)
    {
        final LinearLayout viewApple = (LinearLayout) findViewById(R.id.viewApple);
        final TextView text = (TextView)findViewById(R.id.textView2);
        final Button button = (Button)findViewById(R.id.button);
        final Button button2 = (Button)findViewById(R.id.button2);
        button.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);
        button2.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_YES);
        viewApple.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_NO_HIDE_DESCENDANTS);
        viewApple.setVisibility(View.GONE);
        button.setVisibility(View.VISIBLE);
        button2.setVisibility(View.VISIBLE);
    }




}

