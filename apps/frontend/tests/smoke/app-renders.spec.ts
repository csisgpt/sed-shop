import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Home from '~/pages/index.vue'

describe('app smoke', () => {
  it('renders home page', () => {
    const wrapper = mount(Home)
    expect(wrapper.html()).toContain('فروشگاه سِد')
  })
})
