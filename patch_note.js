var PatchNote = [
    new PatchInfo("0.1.0", "데스크탑 브라우저용 기본 UI 설계 작업"),
    new PatchInfo("0.2.0", "캔버스 기능 구현 (지형, 로케이션, 그리드)\n" + "Badlands ~ Twilight World 까지 모든 지형 지원\n" + "디자인 패턴 변경 (-> MVC)")
];

function PatchInfo(version, detail) {
    this.version = version;
    this.detail = detail;
}