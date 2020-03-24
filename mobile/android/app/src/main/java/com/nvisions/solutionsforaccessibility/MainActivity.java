package com.nvisions.solutionsforaccessibility;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button liveRegion = (Button) findViewById(R.id.live_region);
        liveRegion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), LiveRegionActivity.class);
                startActivity(intent);
            }
        });

        Button labelFor = (Button) findViewById(R.id.label_for);
        labelFor.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), LabelForActivity.class);
                startActivity(intent);
            }
        });

        Button carousel = (Button) findViewById(R.id.carousel);
        carousel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), CarouselActivity.class);
                startActivity(intent);
            }
        });

    }
}
