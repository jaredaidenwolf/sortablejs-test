import { Controller } from '@hotwired/stimulus';
import Sortable from 'sortablejs';
import { put } from '@rails/request.js';

export default class extends Controller {
  static targets = ['list'];

  connect() {
    this.sortable = Sortable.create(this.listTarget, {
      animation: 350,
      ghostClass: 'bg-gray-200',
      onEnd: this.onEnd.bind(this),
      handle: '[data-sortable-handle]',
    });
  }

  disconnect() {
    this.sortable.destroy();
  }

  onEnd(event) {
    const { newIndex, item } = event;
    const url = item.dataset.sortableUrl;

    if (!url) {
      console.error('Sortable URL is missing');
      return;
    }

    put(url, {
      body: JSON.stringify({ position: newIndex }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector("[name='csrf-token']").content,
      },
    }).catch((error) => {
      console.error('Error updating position:', error);
    });
  }
}
