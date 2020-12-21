package com.nvisions.solutionsforaccessibility.korailTalk;

import android.content.Context;
import android.content.DialogInterface;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityManager;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.SeekBar;
import android.widget.TextView;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.view.ViewCompat;

import com.nvisions.solutionsforaccessibility.R;

import static androidx.core.view.accessibility.AccessibilityNodeInfoCompat.AccessibilityActionCompat.ACTION_CLICK;

public class KorailTalkWithAccessibilityActivity extends AppCompatActivity {

    private int peopleCountInt = 1;
    private SeekBar seekBar;

    private int stationType = 0;
    private final int START_STATION = 0;
    private final int DESTINATION_STATION = 1;

    private String startStationName;
    private String destinationStationName;

    public static void handleVolumeUp() {
    }

    public static void handleVolumeDown() {
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_korail_talk_with_accessibility);
        startStationName = getString(R.string.seoul);
        destinationStationName = getString(R.string.daejeon);
        setTitle(getString(R.string.goodExample));
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        setButtonsForAccessibility();
    }

    private void setButtonsForAccessibility() {
        TextView startStationView = findViewById(R.id.startStation);
        ViewCompat.replaceAccessibilityAction(startStationView, ACTION_CLICK, getString(R.string.changeStartStation), null);
        TextView destinationStationView = findViewById(R.id.destinationStation);
        ViewCompat.replaceAccessibilityAction(destinationStationView, ACTION_CLICK, getString(R.string.changeArrivingStation), null);
        TextView peopleCountLabel = findViewById(R.id.peopleCount);
        ViewCompat.replaceAccessibilityAction(peopleCountLabel, ACTION_CLICK, getString(R.string.changePeopleCount), null);
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
if (startStationName == getString(R.string.seoul)) {
    seoulStationView.setSelected(true);
    seoulStationView.setBackgroundColor(Color.BLUE);
} else if (startStationName == getString(R.string.busan)) {
    busanStationView.setSelected(true);
    busanStationView.setBackgroundColor(Color.BLUE);
} else if (startStationName == getString(R.string.dongdaegu)) {
    dongdaeguStationView.setSelected(true);
    dongdaeguStationView.setBackgroundColor(Color.BLUE);
} else if (startStationName == getString(R.string.daejeon)) {
                    daejeonStationView.setSelected(true);
                    daejeonStationView.setBackgroundColor(Color.BLUE);
            }
        } else {
            if (destinationStationName == getString(R.string.seoul)) {
                seoulStationView.setSelected(true);
                seoulStationView.setBackgroundColor(Color.BLUE);
            } else if (destinationStationName == getString(R.string.busan)) {
                busanStationView.setSelected(true);
                busanStationView.setBackgroundColor(Color.BLUE);
            } else if (destinationStationName == getString(R.string.dongdaegu)) {
                dongdaeguStationView.setSelected(true);
                dongdaeguStationView.setBackgroundColor(Color.BLUE);
            } else if (destinationStationName == getString(R.string.daejeon)) {
                daejeonStationView.setSelected(true);
                daejeonStationView.setBackgroundColor(Color.BLUE);
            }
        }
        ConstraintLayout board = findViewById(R.id.board);
        board.setVisibility(View.VISIBLE);

        Button closeButton = findViewById(R.id.closeButton);
        closeButton.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED);
    }

    private void hideBoard() {
        ConstraintLayout board = findViewById(R.id.board);
        board.setVisibility(View.GONE);
        if (stationType == START_STATION) {
            TextView startStationView = findViewById(R.id.startStation);
            startStationView.setSelected(false);
            startStationView.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED);
        } else {
            TextView destinationStationView = findViewById(R.id.destinationStation);
            destinationStationView.setSelected(false);
            destinationStationView.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED);
        }
    }

    public void closeBoard(View view) {
        hideBoard();
    }

    public void setStartStation(View view) {
        stationType = START_STATION;
        showBoard();
                TextView startStationView = findViewById(R.id.startStation);
        TextView destinationStationView = findViewById(R.id.destinationStation);
        startStationView.setSelected(true);
        destinationStationView.setSelected(false);
        }

    public void setDestinationStation(View view) {
        stationType = DESTINATION_STATION;
        showBoard();
        TextView destinationStationView = findViewById(R.id.destinationStation);
        TextView startStationView = findViewById(R.id.startStation);
        destinationStationView.setSelected(true);
        startStationView.setSelected(false);
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
        view.announceForAccessibility(getString(R.string.setStartStation) + startStationName + getString(R.string.setDestinationStation) + destinationStationName);
    }

    public void setBusanStation(View view) {
        if (stationType == START_STATION) {
            TextView startStationView = findViewById(R.id.startStation);
            startStationView.setText(getString(R.string.busan));
            startStationName = getString(R.string.busan);
        } else {
            TextView destinationStationView = findViewById(R.id.destinationStation);
            destinationStationView.setText(getString(R.string.busan));
            destinationStationName = getString(R.string.busan);
        }
        hideBoard();
    }

    public void setDongdaeguStation(View view) {
        if (stationType == START_STATION) {
            TextView startStationView = findViewById(R.id.startStation);
            startStationView.setText(getString(R.string.dongdaegu));
            startStationName = getString(R.string.dongdaegu);
        } else {
            TextView destinationStationView = findViewById(R.id.destinationStation);
            destinationStationView.setText(getString(R.string.dongdaegu));
            destinationStationName = getString(R.string.dongdaegu);
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
        alert.setMessage(getString(R.string.choosePeopleCount));

        LinearLayout linearLayout = new LinearLayout(this);
        linearLayout.setOrientation(LinearLayout.VERTICAL);

        seekBar = new SeekBar(this);
        int id = View.generateViewId();
        seekBar.setId(id);
        seekBar.setMin(1);
        seekBar.setMax(8);
        seekBar.setContentDescription(getString(R.string.peopleCountLabel));
        final TextView peopleCount = new TextView(this);
        peopleCount.setText(getString(R.string.peopleCount));
        peopleCount.setAccessibilityLiveRegion(View.ACCESSIBILITY_LIVE_REGION_ASSERTIVE);
        peopleCount.setPadding(20, 20, 0, 0);
        final AccessibilityManager accessibilityManager = (AccessibilityManager) getSystemService(Context.ACCESSIBILITY_SERVICE);

        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {
                if (accessibilityManager.isEnabled()) {
                    peopleCount.setText(i + getString(R.string.peopleNumber));
                }
                peopleCountInt = i;
                            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                peopleCount.setText(peopleCountInt + getString(R.string.peopleNumber));
            }
        });

        linearLayout.addView(seekBar);
        linearLayout.addView(peopleCount);
        alert.setView(linearLayout);

        alert.setPositiveButton(getString(R.string.ok), new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                dialog.dismiss();
                TextView peopleCountView = findViewById(R.id.peopleCount);
                peopleCountView.setText(peopleCountInt + getString(R.string.peopleNumber));
            }
        });

        alert.setNegativeButton(getString(R.string.cancel), new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                dialog.dismiss();
            }
        });



        //토크백이 활성화된 상태에서 아래 코드는 작동안함
//        alert.setOnKeyListener(new DialogInterface.OnKeyListener() {
//            @Override
//            public boolean onKey(DialogInterface dialogInterface, int keyCode, KeyEvent keyEvent) {
//                Log.d("plusapps", "onKey");
//                if (keyEvent.getAction() == KeyEvent.ACTION_UP) {
//                    return false;
//                }
//
//                if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
//                    Log.d("plusapps", "banana");
//                    if (seekBar != null && seekBar.isShown()) {
//                        Log.d("plusapps", "banana2");
//                        peopleCountInt = peopleCountInt - 1;
//                        if (peopleCountInt < 1) {
//                            peopleCountInt = 1;
//                        }
//
//                        seekBar.setProgress(peopleCountInt);
//                    }
//                    //return true;
//                } else if (keyCode == KeyEvent.KEYCODE_VOLUME_UP) {
//                    Log.d("plusapps", "apple");
//                    if (seekBar != null && seekBar.isShown()) {
//                        Log.d("plusapps", "apple2");
//                        peopleCountInt = peopleCountInt + 1;
//                        if (peopleCountInt > 8 ) {
//                            peopleCountInt = 8;
//                        }
//
//                        seekBar.setProgress(peopleCountInt);
//                    }
//
//                    //return true;
//                }
//
//
//
//                return false;
//            }
//        });

        alert.show();
    }
}