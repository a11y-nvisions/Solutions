package com.nvisions.solutionsforaccessibility.LiveRegion;

import android.os.Bundle;
import android.view.View;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityManager;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class LiveRegionExample1Activity extends AppCompatActivity implements 	View.OnClickListener {

    // An int variable to hold a value
    private int value = 0;

    // A bunch of Buttons and a TextView
    private Button btnAdd;
    private Button btnTake;
    private TextView txtValue;
    private Button btnGrow;
    private Button btnShrink;
    private Button btnReset;
    private Button btnHide;
    private AccessibilityManager accessibilityManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_live_region_example1);
        if(getActionBar() != null) {
            getActionBar().setDisplayHomeAsUpEnabled(true);
        }

        // Get a reference to all the buttons in our UI
        // Match them up to all our Button objects we declared earlier
        btnAdd = (Button) findViewById(R.id.btnAdd);
        btnTake = (Button) findViewById(R.id.btnTake);
        txtValue = (TextView) findViewById(R.id.txtValue);
        btnGrow = (Button) findViewById(R.id.btnGrow);
        btnShrink = (Button) findViewById(R.id.btnShrink);
        btnReset = (Button) findViewById(R.id.btnReset);
        btnHide = (Button) findViewById(R.id.btnHide);
        // Listen for all the button clicks
        btnAdd.setOnClickListener(this);
        btnTake.setOnClickListener(this);

        btnGrow.setOnClickListener(this);
        btnShrink.setOnClickListener(this);
        btnReset.setOnClickListener(this);
        btnHide.setOnClickListener(this);



    }

    @Override
    public void onClick(View view) {

        // A local variable to use later
        float size;

        switch(view.getId()){
            case R.id.btnAdd:
                value ++;
                txtValue.setText(""+ value);
                                break;

            case R.id.btnTake:
                value--;
                txtValue.setText(""+ value);
                break;

            case R.id.btnReset:
                value = 0;
                txtValue.setText(""+ value);
                break;

            case R.id.btnGrow:
                size = txtValue.getTextScaleX();
                txtValue.setTextScaleX(size + 1);
                                break;

            case R.id.btnShrink:
                size = txtValue.getTextScaleX();
                txtValue.setTextScaleX(size - 1);
                break;

            case R.id.btnHide:
                if(txtValue.getVisibility() == View.VISIBLE)
                {
                    // Currently visible so hide it
                    txtValue.setVisibility(View.INVISIBLE);

                    // Change text on the button
                    btnHide.setText("보이기");
                    btnAdd.setEnabled(false);
                    btnGrow.setEnabled(false);
                    btnReset.setEnabled(false);
                    btnShrink.setEnabled(false);
                    btnTake.setEnabled(false);
                }else{
                    // Currently hidden so show it
                    txtValue.setVisibility(View.VISIBLE);

                    // Change text on the button
                    btnHide.setText("숨기기");
                    btnAdd.setEnabled(true);
                    btnGrow.setEnabled(true);
                    btnReset.setEnabled(true);
                    btnShrink.setEnabled(true);
                    btnTake.setEnabled(true);

                }


                break;



        }


    }
}