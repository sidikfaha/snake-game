export default class State {
  private scoreInternal: number
  private scoreListener: any
  private scoreDOM: HTMLElement

  constructor(elSelector: string) {
    this.scoreInternal = 0
    this.scoreDOM = document.querySelector(elSelector)
    this.scoreListener = val => {
      this.scoreDOM.innerHTML = val
    }
  }

  get scores () {
    return this.scoreInternal
  }

  set scores(score: number) {
    this.scoreInternal = score
    this.scoreListener(score)
  }

  public registerScoreListener(listener: any) {
    this.scoreListener = listener
  }

}