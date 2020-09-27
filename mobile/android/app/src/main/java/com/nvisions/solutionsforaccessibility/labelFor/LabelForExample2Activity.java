package com.nvisions.solutionsforaccessibility.labelFor;

import android.content.res.ColorStateList;
import android.os.Bundle;
import android.view.View;
import android.view.accessibility.AccessibilityEvent;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class LabelForExample2Activity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_label_for_example2);
        if(getActionBar() != null) {
            getActionBar().setDisplayHomeAsUpEnabled(true);
        }
        //lock orientation bad idea
        //setRequestedOrientation (ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);

        final TextView errorText = (TextView)findViewById(R.id.errorText);
        final EditText name = (EditText)findViewById(R.id.nameInput);
        final EditText email = (EditText)findViewById(R.id.emailInput);
        final TextView nameLabel = (TextView)findViewById(R.id.nameLabel);
        final TextView emailLabel = (TextView)findViewById(R.id.emailLabel);
        final EditText phone = (EditText)findViewById(R.id.phoneInput);
        final ColorStateList oldColors =  nameLabel.getTextColors(); //save original colors


        final Button register = (Button) findViewById(R.id.registerButton);
        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                nameLabel.setTextColor(oldColors);
                emailLabel.setTextColor(oldColors);
                register.announceForAccessibility("에러 텍스트 사라짐.");
                if( name.getText().toString().length() == 0 ) {
                    errorText.setVisibility(View.VISIBLE);
                    nameLabel.setTextColor(errorText.getCurrentTextColor());
                    name.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED);
                }
                if( email.getText().toString().length() == 0 ) {
                    errorText.setVisibility(View.VISIBLE);
                    email.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED);
                    emailLabel.setTextColor(errorText.getCurrentTextColor());
                }
            }
        });

        final Button reset = (Button) findViewById(R.id.resetButton);
        reset.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                name.setError(null);
                email.getText().clear();
                name.getText().clear();
                phone.getText().clear();
                reset.announceForAccessibility("모든 값이 초기화됨.");
            }
        });

    }
}
