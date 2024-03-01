import{_ as s,c as i,o as a,a2 as t}from"./chunks/framework.Cf4MqoJe.js";const g=JSON.parse('{"title":"Functions","description":"","frontmatter":{},"headers":[],"relativePath":"functions.md","filePath":"functions.md","lastUpdated":1709285770000}'),n={name:"functions.md"},e=t(`<h1 id="functions" tabindex="-1">Functions <a class="header-anchor" href="#functions" aria-label="Permalink to &quot;Functions&quot;">​</a></h1><p>Functions for working with functions.</p><h2 id="maybeFunction" tabindex="-1">maybeFunction(fn, args) <a class="header-anchor" href="#maybeFunction" aria-label="Permalink to &quot;maybeFunction(fn, args) {#maybeFunction}&quot;">​</a></h2><p>This function can be used to call a function or return a value that isn&#39;t a function.</p><p>It&#39;s a useful shortcut if you have a variable (for example, a configuration option) which can contain a static value or a function that returns a value.</p><p>In this example, <code>notfn</code> is a static value and <code>maybeFunction()</code> will simply return it.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> notfn</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Hello World!&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> result</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> maybeFunction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(notfn);  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// =&gt; &#39;Hello World!&#39;</span></span></code></pre></div><p>In this example, <code>isfn</code> is a function that returns a value. Now <code>maybeFunction()</code> will call the function and return the value that it returns.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> isfn</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;Hello World!&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> result</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> maybeFunction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(isfn);  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// =&gt; &#39;Hello World!&#39;</span></span></code></pre></div><p>Any additional arguments passed to <code>maybeFunction()</code> will be forwarded to the function.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> add</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> result</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> maybeFunction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(add, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// =&gt; 30</span></span></code></pre></div>`,11),h=[e];function l(p,k,o,d,r,c){return a(),i("div",null,h)}const y=s(n,[["render",l]]);export{g as __pageData,y as default};
