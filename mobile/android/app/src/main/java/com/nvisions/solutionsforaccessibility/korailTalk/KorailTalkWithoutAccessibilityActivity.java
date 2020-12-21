package com.nvisions.solutionsforaccessibility.korailTalk;

import android.content.DialogInterface;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.CheckBox;
import android.widget.LinearLayout;
import android.widget.SeekBar;
import android.widget.TextView;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

import com.nvisions.solutionsforaccessibility.R;

public class KorailTalkWithoutAccessibilityActivity extends AppCompatActivity {
    private int peopleCountInt = 1;
    private int stationType = 0;
    private final int START_STATION = 0;
    private final int DESTINATION_STATION = 1;
    private String startStationName = "서울";
    private String destinationStationName = "대전";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_korail_talk_without_accessibility);
        setTitle(getString(R.string.badExample));
    }


    private void showBoard() {

        TextView seoulStationView = findViewById(R.id.seoul);
        seoulStationView.setSelected(false);
        TextView busanStationView = findViewById(R.id.busan);
        busanStationView.setSelected(false);
        TextView dongdaeguStationView = findViewById(R.id.dongdaegu);
        dongdaeguStationView.setSelected(false);
        TextView daejeonStationView = findViewById(R.id.daejeon);
        daejeonStationView.setSelected(false);

        seoulStationView.setBackgroundColor(Color.TRANSPARENT);
        busanStationView.setBackgroundColor(Color.TRANSPARENT);
        dongdaeguStationView.setBackgroundColor(Color.TRANSPARENT);
        daejeonStationView.setBackgroundColor(Color.TRANSPARENT);

        if (stationType == START_STATION) {
            switch (startStationName) {
                case "서울":
                    seoulStationView.setSelected(true);
                    seoulStationView.setBackgroundColor(Color.BLUE);
                    break;
                case "부산":
                    busanStationView.setSelected(true);
                    busanStationView.setBackgroundColor(Color.BLUE);
                    break;
                case "동대구":
                    dongdaeguStationView.setSelected(true);
                    dongdaeguStationView.setBackgroundColor(Color.BLUE);
                    break;
                case "대전":
                    daejeonStationView.setSelected(true);
                    daejeonStationView.setBackgroundColor(Color.BLUE);
                    break;
            }
        } else {
            switch (destinationStationName) {
                case "서울":
                    seoulStationView.setSelected(true);
                    seoulStationView.setBackgroundColor(Color.BLUE);
                    break;
                case "부산":
                    busanStationView.setSelected(true);
                    busanStationView.setBackgroundColor(Color.BLUE);
                    break;
                case "동대구":
                    dongdaeguStationView.setSelected(true);
                    dongdaeguStationView.setBackgroundColor(Color.BLUE);
                    break;
                case "대전":
                    daejeonStationView.setSelected(true);
                    daejeonStationView.setBackgroundColor(Color.BLUE);
                    break;
            }
        }

        ConstraintLayout board = findViewById(R.id.board);
        board.setVisibility(View.VISIBLE);
        CheckBox startStation = (CheckBox)findViewById(R.id.startStation);
        CheckBox endStation = (CheckBox)findViewById(R.id.destinationStation);
        startStation.setSelected(true);
        endStation.setSelected(true);
    }

    private void hideBoard() {
        ConstraintLayout board = findViewById(R.id.board);
        CheckBox startStation = (CheckBox)findViewById(R.id.startStation);
        CheckBox endStation = (CheckBox)findViewById(R.id.destinationStation);
        startStation.setSelected(false);
        endStation.setSelected(false);
        startStation.setChecked(false);
        endStation.setChecked(false);
        board.setVisibility(View.GONE);
    }

    public void closeBoard(View view) {
        hideBoard();
    }

    public void setStartStation(View view) {
        stationType = START_STATION;
        showBoard();
        CheckBox startStation = (CheckBox)findViewById(R.id.startStation);
        CheckBox endStation = (CheckBox)findViewById(R.id.destinationStation);
        startStation.setChecked(true);
        endStation.setChecked(false);


    }

    public void setDestinationStation(View view) {
        stationType = DESTINATION_STATION;
        showBoard();
        CheckBox startStation = (CheckBox)findViewById(R.id.startStation);
        CheckBox endStation = (CheckBox)findViewById(R.id.destinationStation);
        startStation.setChecked(false);
        endStation.setChecked(true);


    }

    public void changeStation(View view) {
        String startStation = null;
        TextView startStationView = findViewById(R.id.startStation);
        startStation = startStationView.getText().toString();

        String destinationStation = null;
        TextView destinationStationView = findViewById(R.id.destinationStation);
        destinationStation = destinationStationView.getText().toString();


        startStationView.setText(destinationStation);
        startStationName = destinationStation;
        destinationStationView.setText(startStation);
        destinationStationName = startStation;
    }

    public void setBusanStation(View view) {
        if (stationType == START_STATION) {
            TextView startStationView = findViewById(R.id.startStation);
            startStationView.setText("부산");
            startStationName = "부산";
        } else {
            TextView destinationStationView = findViewById(R.id.destinationStation);
            destinationStationView.setText("부산");
            destinationStationName = "부산";
        }
        hideBoard();
    }

    public void setDongdaeguStation(View view) {
        if (stationType == START_STATION) {
            TextView startStationView = findViewById(R.id.startStation);
            startStationView.setText("동대구");
            startStationName = "동대구";
        } else {
            TextView destinationStationView = findViewById(R.id.destinationStation);
            destinationStationView.setText("동대구");
            destinationStationName = "동대구";
        }
        hideBoard();
    }

    public void setSeoulStation(View view) {
        if (stationType == START_STATION) {
            TextView startStationView = findViewById(R.id.startStation);
            startStationView.setText(getString(R.string.seoul));
            startStationName = getString(R.string.seoul);
        } else {
            TextView destinationStationView = findViewById(R.id.destinationStation);
            destinationStationView.setText(getString(R.string.seoul));
            destinationStationName = getString(R.string.seoul);
        }
        hideBoard();
    }

    public void setDaejeonStation(View view) {
        if (stationType == START_STATION) {
            TextView startStationView = findViewById(R.id.startStation);
            startStationView.setText(getString(R.string.daejeon));
            startStationName = getString(R.string.daejeon);
        } else {
            TextView destinationStationView = findViewById(R.id.destinationStation);
            destinationStationView.setText(getString(R.string.daejeon));
            destinationStationName = getString(R.string.daejeon);
        }
        hideBoard();
    }

    public void setPeopleCount(View view) {
        peopleCountInt = 1;

        final AlertDialog.Builder alert = new AlertDialog.Builder(this);

        alert.setTitle(getString(R.string.peopleCountLabel));
        alert.setMessage("인원수를 선택해주세요");

        LinearLayout linearLayout = new LinearLayout(this);
        linearLayout.setOrientation(LinearLayout.VERTICAL);

        SeekBar seekBar=new SeekBar(this);
        seekBar.setMin(1);
        seekBar.setMax(8);

        final TextView peopleCount = new TextView(this);
        peopleCount.setText("1명");
        peopleCount.setPadding(20, 20, 0,0);


        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {

            @Override
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {
                peopleCountInt = i;
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                peopleCount.setText(peopleCountInt + "명");
            }
        });

        linearLayout.addView(seekBar);
        linearLayout.addView(peopleCount);
        alert.setView(linearLayout);

        alert.setPositiveButton("확인",new DialogInterface.OnClickListener()
        {
            public void onClick(DialogInterface dialog,int id)
            {
                dialog.dismiss();

                TextView peopleCountView = findViewById(R.id.peopleCount);
                peopleCountView.setText(peopleCountInt + "명");
            }
        });

        alert.setNegativeButton("취소",new DialogInterface.OnClickListener()
        {
            public void onClick(DialogInterface dialog,int id)
            {
                dialog.dismiss();
            }
        });

        alert.show();
    }
}


