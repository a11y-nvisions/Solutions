export const about_tab = `
<section>
    <tab-list>
        <tab-item aria-controls="tpn_about_tab">탭이란?</tab-item>
        <tab-item aria-controls="tpn_tab_pattern">탭 마크업 패턴</tab-item>
        <tab-item aria-controls="tpn_tab_requirements">탭 구성요소 유형 및 속성</tab-item>
    </tab-list>
    
    <tab-panel id="tpn_about_tab">
        <h2>탭컨트롤이란?</h2>
        <p>
        <strong>탭 컨트롤</strong>은 라디오 버튼(<span><code class="language-html cl nRadio"></code></span>)처럼 목록 안의 여러 항목 중에 하나를 선택하는 컨셉의 UI로, 일반적으로,
        일반적인 버튼이 나열된 듯한 모습을 하고 있다. 대표적으로 Windows의 파일이나 폴더에서 컨텍스트 메뉴를 통해 열 수 있는 "속성" 창에서 처음 볼 수 있으며, 브라우저에서도 이 요소를 볼 수 있다.
        </p>
        <p>탭 컨트롤은 탭버튼을 포함하는 탭목록과 탭 페이지 내용을 담는 탭패널이 있다.</p>

        <section>
            <h3>라디오 버튼이나 목록상자로도 만들 수 있는 기능이잖아? 왜 있는 걸까?</h3>
            <p>
                탭컨트롤은 하나의 콘텐츠를 집중적으로 보여주는 것에 초점이 맞춰져 있는 콘텐츠 표시를 전문으로 하는 요소다.
                컨트롤 요소이기 때문에 한 개의 탭만 선택할 수 있는 것이며, 한 개의 탭을 선택함과 동시에 다른 탭의 콘텐츠는 모두 숨겨지게 된다.
                조금 더 의미론적인 프로그래밍, UI 설계를 위해 구분한 것이리라.
            </p>
        </section>
        <section>
            <h3>플랫폼에 따른 구조 특징</h3>
            <p>macOS(OS X)나 Windows 등에서 먼저 추가된 이 탭 컨트롤은 탭목록, 탭 콘텐츠 순으로 설계되었다. 이것이 순서상 논리적으로 콘텐츠를 이해하기 쉽기도 하다.
            왜 이 순서가 논리적이고 이해하기 쉬운지 이해가 안 간다고? 생각 해 보라. 만약, 문서를 읽는데, 본론이 먼져 나오고 제목이 먼저 나온다면 뭔가 이상하지 않는가?</p>
            <p>
                그러나 예외는 언제나 생기기 마련이다. 대표적인 사례가 iOS 네이티브 앱의 탭막대다. iOS 네이티브 앱의 탭 막대는 순서상 화면 제일 아래에 달라붙어있다.
                아마도 이것에 대해서는 논쟁이 많이 오고 갔으리라 생각이 든다. 다만, iOS나 Android 등을 주로 터치로 사용하기 때매, 환경적 특성으로 받아들여지는 듯 하다.
            </p>
        </sectioN>
        <section>
            <h3>그래서, 터치 스크린이 주 무대인 모바일에서는 화면 하단에 둬도 된다는 소리야?</h3>
            <p>
                그건 좀 많이 고민해 봐야 한다. 마우스 사용자는 터치 스크린을 사용하는 것과 별반 다르지 않아서 큰 문제가 없지만, 데스크탑이나 노트북을 마우스 없이 사용하는 경우도 많다. 그런 경우, 탭 컨트롤에 접근하기 위해 수 많은 콘텐츠를 탐색해야하는 문제점이 생긴다.
            </p>
            <p>
                그렇다고 시각적으로 보이는 콘텐츠 순서와 키보드로 콘텐츠가 탐색되는 순서가 다른 것도 좋은 생각은 아니다. 초점도 당연히 화면 순서랑 동일하게 이동할 거라고 생각하기 때문이다.
            </p>
            <p>
                서론이 길다는 말이 여기까지 들릴 것 같으니 단도직입적으로 결론을 내리겠다. <strong>웹에서 만큼은 탭 컨트롤을 아래에 두는 행위를 하지 않는 것이</strong> 옳다.
            </p>
            <aside style="font-style:italic">
            <p>
            P.S. 그럼 Apple은 iPhone이나 iPad를 키보드로 쓰는 사용자를 무시하는거냐고 물을 수도 있을 것 같으니 한마디만 더 덧붙인다. 웹에서 아래에다 탭컨트롤을 두는 행위를 하지 말라는 이유는
            웹 환경이 많이 표준화되었으나, 아직도 통합되지 않은 부분이 많아서 여러 디바이스에게 동일한 UX를 주는 것은 매우 힘든 일이다. Apple이나 Google은 독자적인 OS 플랫폼 생태계를 만들었고, 네이티브 API를 활용한다는 가정 하에서는 키보드 접근성을 보장한다.
            그러나, 웹으로는 플랫폼에 있는 그 API들을 온전히 끌어올 방법이 아직까지는 없다.
            </p>
            </aside>
        </section>
    </tab-panel>

    <tab-panel id="tpn_tab_pattern">
        <section>
            <h2>요구사항: 탭 컨트롤 마크업 패턴</h2>
            <p>앞서 설명했지만, 탭컨트롤은 총 3가지의 요소유형을 사용하고, 레이아웃은 탭 목록과 탭패널 영역, 두 개로 구조를 나눌 수 있다. 탭목록은 <span><code class="cl tag_div language-html"></code></span>, <span><code class="cl tag_ul language-html"></code></span>, <span><code class="cl tag_ol language-html"></code></span>와 같은 컨테이너에 적용하여 텝목록 컨테이너를 정의할 수 있다.
            탭 목록에 들어갈 탭은 <span><code class="cl tag_li language-html"></code></span>나 <span><code class="cl tag_button language-html"></code></span>등에 정의할 수 있다.
            선택된 탭에는 반드시 <span><code class="cl aSelected language-html"></code></span>를 true로, 선택 안된 탭에는 <span><code class="cl aSelected language-html"></code></span>를 false로 상태정보를 설정한다.
            </p>
            <p>탭 항목 요소는 반드시 <span><code class="cl rTablist language-html"></code></span> 컨테아너랑 DOM 구조상 직계 구조여야 하며, 그렇지 않고 특정 태그에 감싸져있다면 감싼 태그에 <span><code class="cl attr_rNone language-html"></code></span>을 명시하여 접근성 트리 상에서 감싸고 있는 요소가 없는 것처럼 해야 한다.</p>
            <pre><code class="cl ex-tab language-html"></code></pre>
        </section>
    </tab-panel>
    <tab-panel id="tpn_tab_requirements">
        <section>
            <h1>탭 컨트롤의 요구 요소유형 및 속성</h1>
            <p>역시나 탭 마크업 패턴에서 제시한 마크업 구조에 모두 녹아있는 내용이지만, 조금 더 자세히 설명한다.</p>
        
            <dl>
                <dt>
                    <span><code class="language-html cl attr_aLabel"></code></span> 또는
                <span><code class="language-html cl attr_aLabelledby"></code></span>
                </dt>
                <dd class="col2">
                    <p>
                        <strong>적용대상:</strong>
                    </p>
                    <ul>
                        <li><span><code class="language-html cl rTablist"></code></span>(필수)</li>
                        <li><span><code class="language-html cl rTabpanel"></code></span>(필수)</li>
                        <li><span><code class="language-html cl rTab"></code></span>(선택)</li>
                    </ul>
                </dd>
                <dd class="col2">
                    <p><strong>설명:</strong></p>
                    <div>
                        탭목록, 탭항목, 탭패널에 사용자가 식별할 수 있는 이름을 부여할 때 사용한다. 스크린리더 사용자에게 해당 텍스트로 탭 목록이나 탭 패널등의 이름이 안내된다. 선택적으로 tab에도 적용 가능하다.
                    </div>
                </dd>
            
            </dl>
            <dl>
                <dt>
                    <div><span><code class="language-html cl attr_rTablist"></code></span></div>
                </dt>
                <dd class="col2">
                    <p><strong>적용 대상:</strong></p>
                    <div>탭 목록 컨테이너로 만들 <span><code class="language-html cl tag_ul"></code></span>이나 <span><code class="language-html cl tag_div"></code></span>, 또는 커스텀 요소</div>
                </dd>
                <dd class="col2">
                    <p><strong>설명:</strong></p>
                    <div>AT 유저(스크린리더)로부터 해당 태그 영역이 탭목록 영역으로 인식되도록 한다.</div>
                </dd>
            </dl>
            <dl>
                <dt>
                    <span><code class="language-html cl attr_rTab"></code></span>
                </dt>
                <dd class="col2">
                    <p><strong>적용대상:</strong></p>
                    <div>
                        탭으로 만들 <span><code class="language-html cl tag_ll"></code></span>이나 <span><code class="language-html cl tag_div"></code></span>, <span><code class="language-html cl tag_button"></code></span> <span><code class="language-html cl tag_anchor"></code></span>, 또는 커스텀 요소
                    </div>
                </dd>
                
                <dd class="col2">
                    <p><strong>설명:</strong></p
                    <div>
                        AT 유저(스크린리더)로부터 해당 태그를 탭으로 인식되도록 한다.
                    </div>
                </dd>
            </dl>
            <dl>
                <dt><span><code class="language-html cl attr_rTabpanel"></code></span></dt>
                <dd class="col2">
                    <p><strong>적용대상:</strong></p>
                    <div>
                        탭 콘텐츠를 표시할 패널 또는 페이지로 만들 <span><code class="language-html cl tag_div"></code></span> 또는 커스텀 요소
                    </div>
                </dd>
                <dd class="col2">
                    <p><strong>설명:</strong></p>
                    <div>
                        AT 유저(스크린리더)로부터 해당 태그를 탭 페이지로 인식되도록 한다.
                    </div>
                </dd>
            </dl>
            <dl>
                <dt>
                    <span><code class="language-html cl attr_tabidx_0"></code></span>
                </dt>
                <dd class="col2">
                    <p><strong>적용대상:</strong></p>
                    <div><span><code class="language-html cl rTab"></code></span></div>
                </dd>
                <dd class="col2">
                    <p><strong>설명:</strong></p>
                    <div>
                        <p>처음 탭에 접근했을 때, 특별한 경우가 아니라면 첫번째 탭이 선택된 상태로 초점이 가도록 <span><code class="language-html cl attr_tabidx_0"></code></span>을 설정해야 한다.
                        선택되지 않은 탭에는 초점이 가서는 안 된다.</p>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt>
                    <span><code class="language-html cl attr_aSelected"></code></span>
                </dt>
                <dd class="col2">
                    <p><strong>적용대상:</strong></p>
                    <div><span><code class="language-html cl rTab"></code></span></div>
                </dd>
                <dd class="col2">
                    <p><strong>설명:</strong></p>
                    <div>
                        <p>선택된 탭에는 true, 선택 안 된 탭에는 false로 설정한다.</p>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt>
                    <span><code class="language-html cl attr_aOrientation"></code></span>
                </dt>
                <dd class="col2">
                    <p><strong>적용대상:</strong></p>
                    <div><span><code class="language-html cl rTablist"></code></span></div>
                </dd>
                <dd class="col2">
                    <p><strong>설명:</strong></p>
                    <div>
                        <p>선택된 탭이 가로로 나열돼 있는지, 세로로 나열돼 있는지 명시한다. 이 속성은 필수는 아니며, 모든 탭은 기본적으로 가로 방향을 전제로 하기에, 이 가로로 배치하는 경우는 굳이 명시할 필요 없다.</p>
                    </div>
                </dd>
            </dl>
        </section>
    </tab-panel>
</section>
`;