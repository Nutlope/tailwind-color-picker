import { LitElement, html, customElement, property, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

@customElement('ac-color-spot')
class ColorSpot extends LitElement {
  static styles = css`
    .spot {
      box-sizing: border-box;
      display: block;
      border-radius: 3px;
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }
  `;

  @property()
  public color = '#000000';

  private get spotStyles() {
    return styleMap({
      backgroundColor: this.color,
    });
  }

  render() {
    return html`<div class="spot" style=${this.spotStyles}></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ac-color-spot': ColorSpot;
  }
}
