import { describe, it, expect } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import Loterie from '../src/components/Loterie.vue'
describe('<Loterie>', () => {
  it('should render correctly', async () => {
    const wrapper = mount(Loterie, {
      // props: {
      //   type: 'danger',
      // },
      // slots: {
      //   default: 'Hello World',
      // },
    })
    await flushPromises()
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<button id="loterie">Loterie</button>
      <!--v-if-->"
    `)
  }),
    it('should emit an event when the button is clicked', async () => {
      const wrapper = mount(Loterie)
      await wrapper.get('#loterie').trigger('click')
      expect(wrapper.emitted()).toHaveProperty('loterie-result')
    })
})
