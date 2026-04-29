# Downloads 섹션 설계 분석 & AI 가이드

## 1. 전체 아키텍처

```
[빌드 타임 데이터 수집]            [런타임 렌더링]
scripts/fetch-npm-stats.js   → src/data/npm-stats.ts   → DownloadsSection
scripts/fetch-github-stats.js → src/data/github-stats.ts     ├── CountUpItem (x3)
                                                               └── DownloadsChart (SVG)
```

핵심 설계 원칙: API 호출은 **빌드 타임(스크립트)**에서 하고, 결과를 정적 TS 파일로 저장해서 런타임에는 순수 렌더링만 한다.

## 2. CountUpItem 애니메이션 원리

`src/app/components/downloads/count-up-item.tsx`

1. **IntersectionObserver** (`index.tsx`): 섹션이 뷰포트에 30% 이상 보이면 `isVisible = true`
2. **setInterval 기반 카운트업**:
   - 2초(2000ms) 동안 60 스텝으로 나눠서 0 → 목표값까지 증가
   - 매 ~33.3ms마다 `increment`만큼 더함
   - 목표값 도달 시 `clearInterval`
3. **숫자 포맷팅** (`src/app/utils/formatNumber.ts`): `229297117` → `"229.3M+"`
   - K (천), M (백만), B (십억) 단위 자동 변환
   - 소수점 첫째 자리까지 표시

## 3. DownloadsChart 애니메이션 원리

`src/app/components/downloads/downloads-chart.tsx`

1. 월별 데이터를 **누적합(cumulative)**으로 변환
2. SVG `<path>`에 **3차 Bezier curve** 생성 (`C` 커맨드)
3. **stroke-dasharray/dashoffset 트릭**:
   - `getTotalLength()`로 path 전체 길이 측정
   - `dasharray`를 전체 길이로 설정
   - `dashoffset`을 `pathLength → 0`으로 CSS transition → 선이 그려지는 효과
   - `transition: stroke-dashoffset 2s ease-out`
4. 끝점 `<circle>`: 2초 delay 후 opacity 0→1 fade-in

## 4. API 호출 방식

`scripts/fetch-npm-stats.js`에서 3개 외부 API 호출:

| API | 엔드포인트 | 용도 | 인증 |
|-----|-----------|------|------|
| **NPM Registry** | `https://api.npmjs.org/downloads/range/{start}:{end}/{package}` | 패키지별 일일 다운로드 수 | 불필요 |
| **GitHub API** | `https://api.github.com/repos/{owner}/{repo}` | star 수, fork 수 | `NEXT_PUBLIC_GITHUB_TOKEN` (Bearer) |
| **Libraries.io** | `https://libraries.io/api/npm/{package}?api_key={key}` | dependents 수 | `LIBRARIES_IO_API_KEY` |

### 실행 방법

```bash
# .env.local에 토큰 설정 후
node scripts/fetch-npm-stats.js    # → src/data/npm-stats.ts 생성
node scripts/fetch-github-stats.js # → src/data/github-stats.ts 생성
```

Rate limit 방지를 위해 각 요청 사이에 100~200ms delay 포함.

## 5. AI에게 이런 애니메이션을 잘 시키는 프롬프트 가이드

### 숫자 카운트업 애니메이션 요청 시

```
React에서 숫자 카운트업 컴포넌트를 만들어줘.
- IntersectionObserver로 뷰포트에 보일 때 시작
- setInterval로 2초 동안 0에서 목표값까지 60프레임으로 증가
- 큰 숫자는 K/M/B 단위로 포맷 (예: 229.3M+)
- isVisible prop으로 외부에서 트리거 제어
```

### SVG 라인 드로잉 애니메이션 요청 시

```
SVG path에 stroke-dasharray/dashoffset을 이용한 라인 드로잉 애니메이션을 만들어줘.
- getTotalLength()로 path 길이를 측정
- dasharray를 전체 길이로 설정하고, dashoffset을 길이→0으로 CSS transition
- 데이터 포인트를 Bezier curve(C 커맨드)로 연결해서 부드러운 곡선
- transition duration 2초, ease-out
```

### AI가 잘 못하는 부분 - 명시해야 할 것들

1. **easing 지정을 명확히**: "linear", "ease-out", "cubic-bezier(0.4, 0, 0.2, 1)" 등 구체적으로
2. **트리거 조건 명시**: "스크롤해서 보일 때", "페이지 로드 시", "버튼 클릭 시"
3. **한 번만 실행 여부**: "한 번만 실행하고 다시 안 보이게 되어도 리셋하지 마"
4. **숫자 포맷 규칙 명시**: 단위 변환, 소수점 자릿수, 접미사(+) 등
5. **SVG 애니메이션은 방식 명시**: JS 프레임 조작 vs CSS transition vs SMIL
