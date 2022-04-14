export const treeview_about = `<section>
<h1>트리뷰란?</h1>
<p>
    트리뷰(Treeview)는 목록형 상호작용 요소로 나무가 가지를 치듯 큰 분류에서 작은 분류로 뻗어나가는 형태의 선택가능한 항목을 말한다. 일반적으로 파일 탐색기 왼편을 모두 차지하고 있으며, 선택하면 오른쪽에 있는 항목보기 목록 패널의 내용물이 변경되는 것을 볼 수 있다.
</p>
<p>
    재미있을 거라고는 생각하지 않지만, 왜 나무 주제에 아래로 뻗어나가는 콘텐츠에 트리뷰라는 이름을 붙였는지 모르겠다. 만든 사람 말고는 모를 것이다. 그냥 하나의 굵은 줄기에서 가지로 뻗어나가서 붙인 이름인 것 같다.
</p>
<p>
    단순히 겉모양만 보면 마우스 오른쪽 버튼을 클릭하거나, 키보드의 메뉴 팝업 키를 눌렀을 때 나오는 컨텍스트 메뉴와 조작감이 별반 다르지 않다. 
    하지만, 목록에 접근하는 데에 이 둘은 꽤 큰 차이가 있다.
</p>
</section>
<section>
<h2>메뉴랑 어떤 차이가 있는데?</h2>
<section>
    <h3>조작 설계의 차이</h3>
    <p>
        우선, 조작에 차이가 있다. 메뉴나 트리뷰나 큰 분류에서 작은 분류로 뻗어나가는 형태인 것은 동일하다. 심지어 일반적인 조작 방법도 거의 유사하다. 가장 큰 차이점은 <strong>자유로운 목록 계층간 탐색</strong>이다. 
        마우스만 사용하는 경우에는 크게 와닿지 않지만, 키보드를 사용할 때, 트리뷰는 하위 목록을 확장하여 탐색하다가도 하위항목을 축소하지 않고도 상위 항목으로 이동할 수 있다. 또한 여러 하위 항목을 한꺼번에 열어둘 수 있다.
    </p>

    <p>
        반면에 메뉴 요소는 마우스로 상위항목에 접근은 가능하지만, 한 번에 한 하위 메뉴만을 펼쳐서 볼 수 있다.
        이해가 잘 안간다면, 당장, 바탕화면에서 마우스 오른쪽 버튼을 클릭하고, 보기 항목과 정렬 기준 항목에 마우스를 번갈아가며 올려보면, 열려있던 하위 메뉴가 사라지고, 다른 하위메뉴가 열리는 것을 볼 수 있다.
        
        그리고 일반적으로 키보드 사용자는 하위 메뉴를 탐색 도중에 상위항목을 탐색할 수 없다.
    </p>
</section>
<section>
    <h3>용도의 차이</h3>
    <p>
        메뉴는 일반적으로 여러 기능을 모아놓는 용도로 사용한다. 도움말 페이지를 뛰으는 메뉴 항목, 설정 대화상자를 띄우는 메뉴 항목 등, 기능 실행에 중점을 두고 만들어졌다.
        반면에 트리뷰는 기능 실행의 용도로도 쓸 수도 있지만. 기본적인 기능은 콘텐츠를 요약한 제목을 목록에 담고, 해당 항목을 활성화하면 해당 항목에 대한 콘텐츠를 보여주는 것에 있다.
        즉, 목차 형태로 콘텐츠를 요약하고, 선택하여 해당 콘텐츠를 볼 수 있게 하는 용도로 설계되었다.
    </p>
</section>
<nav class="treeview-page-nav" slot="nav">
    <a href="#treeview-req1">다음 내용으로</a>
</nav>
</section>
`;

export const treeview_pattern = `   
<section>
    <h1>트리뷰 마크업 패턴</h1>
    <p>
        일반적으로 트리뷰를 구현할 때 중첩된 목록과 비슷하게 마크업한다. <span><code class="language-markup cl rTree"></code></span> 요소 안에 <span><code class="language-markup cl rTreeItem"></code></span>을 배치하고,
        treeitem 요소 안에 <span><code class="language-markup cl rGroup"></code></span>으로 묶어 하위 treeitem을 정의할 수 있다.
    </p>
    <p>이것을 마크업한 코드는 다음과 같다.</p>
    <pre><code class="language-markup cl ex-Treeview"></code></pre>
</section>
<nav class="treeview-page-nav">
<a href="#treeview-intro">이전 내용으로</a>
<a href="#treeview-req2">다음 내용으로</a>
</nav>
`;

export const treeview_requirements = `
<section>
        <h1>트리뷰의 요구 요소유형 및 속성</h1>
        <p>앞서 <a href="#treeview-req1">트리뷰 마크업 패턴</a>에서 제시한 마크업 구조에 모두 녹아있는 내용이지만, 조금 더 자세히 설명한다.</p>
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
                        <li><span><code class="language-html cl rTree"></code></span>(필수)</li>
                        <li><span><code class="language-html cl rGroup"></code></span>(필수)</li>
                        <li><span><code class="language-html cl rTreeItem"></code></span>(선택)</li>
                    </ul>
                </dd>
                <dd class="col2">
                    <p><strong>설명:</strong></p>
                    <div>
                        그룹, 트리뷰에 사용자가 식별할 수 있는 이름을 부여할 때 사용한다. 스크린리더 사용자에게 해당 텍스트로 트리뷰 또는 그룹 이름이 안내된다. 선택적으로 treeitem에도 적용 가능하다.
                    </div>
                </dd>
            
            </dl>
            <dl>
                <dt>
                    <div><span><code class="language-html cl attr_rTree"></code></span></div>
                </dt>
                <dd class="col2">
                    <p><strong>적용 대상:</strong></p>
                    <div>트리 목록 컨테이너로 만들 <span><code class="language-html cl tag_ul"></code></span>이나 <span><code class="language-html cl tag_div"></code></span>, 또는 커스텀 요소</div>
                </dd>
                <dd class="col2">
                    <p><strong>설명:</strong></p>
                    <div>AT 유저(스크린리더)로부터 해당 태그 영역이 트리 영역으로 인식되도록 한다.</div>
                </dd>
            </dl>
            <dl>
                <dt>
                    <span><code class="language-html cl attr_rTreeItem"></code></span>
                </dt>
                <dd class="col2">
                    <p><strong>적용대상:</strong></p>
                    <div>
                        트리 항목으로 만들 <span><code class="language-html cl tag_ll"></code></span>이나 <span><code class="language-html cl tag_div"></code></span>, 또는 커스텀 요소
                    </div>
                </dd>
                
                <dd class="col2">
                    <p><strong>설명:</strong></p>
                    <div>
                        AT 유저(스크린리더)로부터 해당 태그를 트리 항목으로 인식되도록 한다.
                    </div>
                </dd>
            </dl>
            <dl>
                <dt><span><code class="language-html cl attr_rGroup"></code></span></dt>
                <dd class="col2">
                    <p><strong>적용대상:</strong></p>
                    <div>
                        트리항목의 하위 트리로 만들 <span><code class="language-html cl tag_ul"></code></span>이나 <span><code class="language-html cl tag_div"></code></span>, 또는 커스텀 요소
                    </div>
                </dd>
                <dd class="col2">
                    <p><strong>설명:</strong></p>
                    <div>
                        AT 유저(스크린리더)로부터 해당 태그를 하위 트리 그룹로 인식되도록 한다.
                    </div>
                </dd>
            </dl>
            <dl>
                <dt>
                    <span><code class="language-html cl attr_tabidx_0"></code></span>
                </dt>
                <dd class="col2">
                    <p><strong>적용대상:</strong></p>
                    <div><span><code class="language-html cl rTreeItem"></code></span></div>
                </dd>
                <dd class="col2">
                    <p><strong>설명:</strong></p>
                    <div>
                        <p>처음 트리뷰에 접근했을 때, 특별한 경우가 아니라면 첫번째 트리 항목에 초점이 가도록 <span><code class="language-html cl attr_tabidx_0"></code></span>을 설정해야 한다.</p>
                        <p>이후에는 AT 유저(스크린리더)가 마지막으로 탐색한 트리 항목으로 초점을 보낼 수 있도록 한다.</p>
                    </div>
                </dd>
            </dl>
        <nav class="treeview-page-nav">
            <a href="#treeview-req1">이전 내용으로</a>
        </nav>
    </section>
`;


export const treeview_example = `
<section>
<h2>트리뷰 동작 구현</h2>

<p>트리뷰는 반드시 다음과 같은 방법으로 모두 조작할 수 있어야 한다.</p>
<dl>
    <dt>탐색</dt>
    <dd>
    <strong>보이는 모든 계층의 항목을 키보드로 탐색할 수 있어야 한다.</strong>
    <p>트리뷰 항목에는 Tab키를 통해 접근이 가능해야 한다. 단, 한 개의 트리뷰 아이템에만 초점을 제공해야 하며, 마지막으로 탐색한 초점의 위치를 기억하여 다시 트리뷰에 접근했을 때 이어서 탐색할 수 있도록 한다.</p>
    <p>
        트리뷰는 "아래 화살표 키"로 다음 항목, "위 화살표 키"로 이전 항목을 탐색할 수 있어야 한다. 트리뷰는 보이는 모든 항목을 위 또는 아래 화살표키로 탐색할 수 있어야 하며, Home키로 보이는 첫 항목, 
        End키로 보이는 마지막 항목으로 이동할 수 있어야 한다.
    </p>
    </dd>
    <dt>하위항목 표시/숨기기</dt>
    <dd>
        <p><strong>하위 항목은 키보드로 숨기고 펼칠 수 있어야 한다.</strong></p>
        <p>하위 항목이 닫혀있는 트리뷰는 오른쪽 화살표 키를 통해 표시할 수 있어야 하며, 확장된 상태로 오른쪽 화살표 키를 한 번 더 누르면 첫번째 하위항목으로 초점이 이동되어야 한다. 반대로 항목이 열려있다면 왼쪽 화살표 키로 닫을 수 있어야 한다. 또, 현재 탐색중인 항목이 하위 트리뷰라면, 왼족 화살표키를 눌러 상위 항목으로 바로 빠져나올 수 있어야 한다.d</p>
        <p>마우스 조작의 경우, 트리뷰 화살표 표시를 눌러 확장하거나,트리뷰 제목텍스트 부분을 제외한 트리뷰 항목의 아무데나 더블클릭하여 확장할 수 있도록 할 수 있으며, 한번 눌러 확장하게 하는 것도 그리 문제가 되지는 않는다.</p>
    </dd>
    <dt>항목 활성화 및 기능 제공</dt>
    <dd>
        <p>
        키보드의 Enter 키를 반드시 click 이벤트가 dispatch되도록 <strong>반드시</strong> 바인딩해야 한다.
        삭제 가능한 트리뷰라면 Delete로 삭제가 가능해야 하며, 이름을 바꿀 수 있다면 Ctrl+F2와 같은 단축키로 이름 바꾸기 모드로 바로 전환할 수 있는 단축키를 제공할 수 있다. 이름바꾸기 단축키의 경우, 트리뷰를 사용하는 것이 웹페이지가 아니라 웹 애플리케이션이라면, 그냥 F2키로 해도 무방하다.
        </p>
        <p>마우스의 경우, 트리뷰를 클릭하면 선택되어야 하며, 키보드 탐색과 연계될 수 있게 해당 트리 항목에 초점이 이동되어야 한다.</p>
    </dd>
</dl>

</section>
    <h3>적용된 예제</h3>
    <treeview-list treeview-mode="panel-mode">
        <treeview-item id="it_ex_item_A" panel-ref="pn_ex_item_A">A Item</treeview-item>
        <treeview-item id="it_ex_item_B" panel-ref="pn_ex_item_B">B Item</treeview-item>
        <treeview-item id="it_ex_item_C" panel-ref="pn_ex_item_C">C Item</treeview-item>
    </treeview-list>
    <treeview-panel id="pn_ex_item_A">
        <h1>You Activated an A Panel!</h1>
    </treeview-panel>
    <treeview-panel id="pn_ex_item_B">
        <h1>You Activated a B Panel!</h1>
    </treeview-panel>
    <treeview-panel id="pn_ex_item_C">
        <h1>You Activated a C Panel!</h1>
    </treeview-panel>
<section>
</section>
`