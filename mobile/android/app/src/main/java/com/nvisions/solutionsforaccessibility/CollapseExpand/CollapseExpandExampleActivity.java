package com.nvisions.solutionsforaccessibility.CollapseExpand;

import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.accessibility.AccessibilityNodeInfo;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class CollapseExpandExampleActivity extends AppCompatActivity {

        public static final String TAG = "MainActivity";
    private boolean isFruitContainerExpanded;
    private boolean isVegitableContainerExpanded;
    private boolean isFruitContainerExpanded2;
    private boolean isVegitableContainerExpanded2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_collapse_expand_example);
        setTitle(getString(R.string.a11ySample));
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            initButtons();
            }

    private void initButtons() {
        final TextView fruitButton = findViewById(R.id.button_fruit);
        fruitButton.setOnClickListener(new View.OnClickListener() {
            @RequiresApi(api = Build.VERSION_CODES.KITKAT)
            @Override
            public void onClick(View v) {
                isFruitContainerExpanded = !isFruitContainerExpanded;
                toggleFruitContainer(v);
            }
        });

        fruitButton.setAccessibilityDelegate(new View.AccessibilityDelegate() {
            @Override
            public boolean performAccessibilityAction(View host, int action, Bundle args) {
                if (super.performAccessibilityAction(host, action, args)) {
                    return true;
                }
                if (action == AccessibilityNodeInfo.ACTION_COLLAPSE) {
                    Log.e(TAG, "performAccessibilityAction: collapse");
                    isFruitContainerExpanded = false;
                    collapseFruitContainer();
                } else if (action == AccessibilityNodeInfo.ACTION_EXPAND) {
                    Log.e(TAG, "performAccessibilityAction: expand");
                    isFruitContainerExpanded = true;
                    expandFruitContainer();
                    return true;
                }
                return false;
            }

            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public void onInitializeAccessibilityNodeInfo(View host, AccessibilityNodeInfo info) {
                super.onInitializeAccessibilityNodeInfo(host, info);
                info.setClassName(Button.class.getName());
                
                if (isFruitContainerExpanded) {
                    Log.e(TAG, "onInitializeAccessibilityNodeInfo: collapse");
                    info.addAction(AccessibilityNodeInfo.AccessibilityAction.ACTION_COLLAPSE);
                } else {
                    Log.e(TAG, "onInitializeAccessibilityNodeInfo: expand");
                    info.addAction(AccessibilityNodeInfo.AccessibilityAction.ACTION_EXPAND);
                }
            }
        });

        final TextView vegitableButton = findViewById(R.id.button_vegitable);
                vegitableButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                isVegitableContainerExpanded = !isVegitableContainerExpanded;
                toggleVegitableContainer(v);
            }
        });

                vegitableButton.setAccessibilityDelegate(new View.AccessibilityDelegate() {
                    @Override
                    public boolean performAccessibilityAction(View host, int action, Bundle args) {
                        if (super.performAccessibilityAction(host, action, args)) {
                            return true;
                        }
                        if (action == AccessibilityNodeInfo.ACTION_COLLAPSE) {
                            Log.e(TAG, "performAccessibilityAction: collapse");
                            isVegitableContainerExpanded = false;
                            collapseVegitableContainer();
                        } else if (action == AccessibilityNodeInfo.ACTION_EXPAND) {
                            Log.e(TAG, "performAccessibilityAction: expand");
                            isVegitableContainerExpanded = true;
                            expandVegitableContainer();
                            return true;
                        }
                        return false;
                    }

                    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
                    @Override
                    public void onInitializeAccessibilityNodeInfo(View host, AccessibilityNodeInfo info) {
                        super.onInitializeAccessibilityNodeInfo(host, info);
info.setClassName(Button.class.getName());
                        if (isVegitableContainerExpanded) {
                            info.addAction(AccessibilityNodeInfo.AccessibilityAction.ACTION_COLLAPSE);
                        } else {
                            info.addAction(AccessibilityNodeInfo.AccessibilityAction.ACTION_EXPAND);
                        }
                    }
                });

        final TextView fruitButton2 = findViewById(R.id.button_fruit2);
        fruitButton2.setOnClickListener(new View.OnClickListener() {
            @RequiresApi(api = Build.VERSION_CODES.KITKAT)
            @Override
            public void onClick(View v) {
                isFruitContainerExpanded2 = !isFruitContainerExpanded2;
                toggleFruitContainer2(v);
            }
        });

        final TextView vegitableButton2 = findViewById(R.id.button_vegitable2);
        vegitableButton2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                isVegitableContainerExpanded2 = !isVegitableContainerExpanded2;
                toggleVegitableContainer2(v);
            }
        });
    }

    private void toggleFruitContainer(View view) {
        if (isFruitContainerExpanded) {
            expandFruitContainer();
        } else {
            collapseFruitContainer();
        }
    }

    private void toggleFruitContainer2(View view) {
        if (isFruitContainerExpanded2) {
            expandFruitContainer2();
        } else {
            collapseFruitContainer2();
        }
    }

    private void collapseFruitContainer2() {
        LinearLayout fruitContainer2 = findViewById(R.id.container_fruit2);
        fruitContainer2.setVisibility(View.GONE);
    }

    private void expandFruitContainer2() {
        LinearLayout fruitContainer2 = findViewById(R.id.container_fruit2);
        fruitContainer2.setVisibility(View.VISIBLE);
    }

    private void collapseFruitContainer() {
        Log.e(TAG, "collapseFruitContainer");
        LinearLayout fruitContainer = findViewById(R.id.container_fruit);
        fruitContainer.setVisibility(View.GONE);
    }

    private void expandFruitContainer() {
        Log.e(TAG, "expandFruitContainer");
        LinearLayout fruitContainer = findViewById(R.id.container_fruit);
        Button apple = (Button)findViewById(R.id.button_apple);
        fruitContainer.setVisibility(View.VISIBLE);
    }

    private void toggleVegitableContainer(View view) {
        if (isVegitableContainerExpanded) {
            expandVegitableContainer();
        } else {
            collapseVegitableContainer();
        }
    }

    private void collapseVegitableContainer() {
        LinearLayout vegitableContainer = findViewById(R.id.container_vegitable);
        vegitableContainer.setVisibility(View.GONE);
    }

    private void expandVegitableContainer() {
        LinearLayout vegitableContainer = findViewById(R.id.container_vegitable);
        vegitableContainer.setVisibility(View.VISIBLE);
    }

    private void toggleVegitableContainer2(View view) {
        if (isVegitableContainerExpanded2) {
            expandVegitableContainer2();
        } else {
            collapseVegitableContainer2();
        }
    }

    private void collapseVegitableContainer2() {
        LinearLayout vegitableContainer2 = findViewById(R.id.container_vegitable2);
        vegitableContainer2.setVisibility(View.GONE);
    }

    private void expandVegitableContainer2() {
        LinearLayout vegitableContainer2 = findViewById(R.id.container_vegitable2);
        vegitableContainer2.setVisibility(View.VISIBLE);
    }




}
