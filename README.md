# Less.Project.BoundEditorLS
A map editor for the game StarCraft to make easy and fast to create a kind of UMS map called "Bound". <br/>
-> 스타크래프트 게임의 폭탄피하기 유즈맵을 쉽고 빠르게 제작할 수 있도록 만들어진 에디터입니다. <br/><br/>

@ Author : Eric Kim <br/>

@ Nickname : Less <br/>

@ Email : syusa5537@gmail.com <br/>

@ ProductName : Less.Project.BoundEditorLS <br/>

@ Live Link : http://bound.devcos.xyz/BoundEditorLS/releases/v0.15.1/ <br/>

@ Version : 0.15.1 <br/>

@ License : Currently Undecided (현재 미정) <br/><br/>

# Version History

@ 0.15.1 (2020-03-26, Latest) <br/>

- 브라우저 호환성 업데이트 - 2차 <br/><br/>

@ 0.15.0 (2020-03-26) <br/>

- 브라우저 호환성 업데이트 - 1차 <br/><br/>

@ 0.14.1 (2020-03-25) <br/>

- 로케이션 위치 이동 시에 좌표 변경 저장이 안 되던 문제 수정 <br/>
- 장애물 설치하고 시뮬레이션 실행한 후 종료했을 때 장애물이 그대로 남아 있는 문제 수정 <br/><br/>

@ 0.14.0 (2020-03-24) <br/>

- 시뮬레이션 기능 추가 (현재는 폭탄 - 스커지, 오버로드, 배틀크루저만 가능 / 장애물 - Remove 방식만 가능) <br/>
- 창 닫기 및 새로고침 시 종료 확인 질문 표시 <br/><br/>

@ 0.13.1 (2020-03-22) <br/>

- 패턴 제작자 질문하는 알림 창 관련 문제 수정 <br/><br/>

@ 0.13.0 (2020-03-22) <br/>

- 타일 이미지가 로드되지 않던 문제 수정 (JS 인터프리터의 스크립트 캐시 전과 후의 동작 문제로 인한 버그) <br/>
- 트리거 추출 후 TrigEdit으로 복사했을 때, 줄바꿈 문자 문제로 컴파일 에러가 뜨던 현상 수정 <br/>
- 개인 프로젝트 여부 변경 기능 추가 <br/>
- 패턴 제작자 및 설명 표시 + 수정 기능 추가 <br/>
- 기타 자잘한 점들 몇 가지 수정 <br/><br/>

@ 0.12.3 (2020-03-21) <br/>

- 트리거 추출 기능 개선 <br/><br/>

@ 0.12.2 (2020-03-21) <br/>

- 트리거 추출 관련 버그 수정 <br/><br/>

@ 0.12.1 (2020-03-21) <br/>

- 다이얼로그 사이즈 관련 문제 hotfix <br/><br/>

@ 0.12.0 (2020-03-21) <br/>

- 트리거 추출 기능 추가 (ScmDraft2 - TrigEdit) <br/><br/>

@ 0.11.0 (2020-03-18) <br/>

- 턴 복사, 반전, 삭제 기능 추가 <br/>
- 프로젝트 제작자, 프로젝트 이름, 패턴 제작자, 패턴 이름 수정 기능 추가 <br/>
- 패턴 삭제 및 위치 변경 (드래그 & 드랍) 기능 추가 <br/>
- 요소들에 마우스 커서 올릴 시 설명 툴팁 팝업 <br/>
- 기타 기능 개선 및 잡다한 버그 수정 <br/>
- 소스 코드 최적화 <br/><br/>

@ 0.10.0 (2020-03-17) <br/>

- New Pattern, Save Pattern, Load Pattern, Save Project, Load Project functions implemented <br/>
- -> 새 패턴, 패턴 저장, 패턴 불러오기, 프로젝트 저장, 프로젝트 불러오기 기능 구현 <br/><br/>

@ 0.9.0 (2020-03-17) <br/>

- Bomb Settings Mode - Location layer concept implemented (Use tab key to switch between locations) <br/>
- -> 폭탄 설정 모드 - 로케이션 레이어 개념 구현 (탭 키로 레이어 전환) <br/><br/>

- Minor bugs fixed <br/>
- -> 자잘한 버그 수정 <br/><br/>

@ 0.8.0 (2020-03-16) <br/>

- Location drag & drop function implemented <br/>
- -> 로케이션 드래그 이동 기능 구현 <br/><br/>

- Locations are now selected in order when multiple locations are stacked in one place <br/>
- -> 로케이션 중첩 시 순차 선택 기능 구현 <br/><br/>

@ 0.7.0 (2020-03-16) <br/>

- Way of selecting bomb units has been changed <br/>
- -> 폭탄 설정 모드의 폭탄 유닛 선택 방식 변경 <br/><br/>

- Images are displayed when setting blocking objects <br/>
- -> 장애물 설정 시 이미지 표시 <br/><br/>

- Different colors are displayed according to the bomb unit's race <br/>
- -> 폭탄 설정 시 종족별로 색깔 다르게 표시 <br/><br/>

@ 0.6.0 (2020-03-15) <br/>

- Basic functions complete for Bomb Settings Mode <br/>
- -> 폭탄 설정 모드 기본 기능 구현 완료 <br/><br/>

- Bugs fixed and source code quality improved <br/>
- -> 버그 수정 및 코드 개선 <br/><br/>

@ 0.5.0 (2020-03-14) <br/>

- Locations are now hidden when user returns to Terrain Mode <br/>
- -> 지형 모드일 때 로케이션이 보이지 않도록 수정 <br/><br/>

- Project concept added and pattern list is now displayed <br/>
- -> 프로젝트 개념 도입 및 현재 패턴 표시 <br/><br/>

- Overall source code quality improvement <br/>
- -> 전반적인 코드 개선 <br/><br/>

@ 0.4.0 (2020-03-14) <br/>

- Location Mode Complete <br/>
- -> 로케이션 모드 구현 완료 <br/><br/>

@ 0.3.0 (2020-03-13) <br/>

- Terrain Mode Complete (Tiles' Copy & Paste will be available later) <br/>
- -> 지형 모드 구현 완료 (지형 복사/붙여넣기는 나중에 지원할 예정) <br/><br/>

@ 0.2.0 (2019-01-02) <br/>

- Implemented canvas functions (Terrain, Location, Grid) <br/>
- -> 캔버스 기능 구현 (지형, 로케이션, 그리드) <br/><br/>

- From Badlands to Twilight World, supports all terrains <br/>
- -> Badlands ~ Twilight World 까지 모든 지형 지원 <br/><br/>

- Changed design pattern (-> MVC) <br/>
- -> 디자인 패턴 변경 (-> MVC) <br/><br/>

@ 0.1.0 (2018-12-30) <br/>

- fundamental UI design for Desktop Browsers <br/>
- -> 데스크탑 브라우저용 기본 UI 설계 작업 <br/>
