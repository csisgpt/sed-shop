import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProductCard from '~/components/ProductCard.vue'

describe('ProductCard', () => {
  it('formats price and emits add', async () => {
    const product = { id: '1', title: 'تست', price: 1000, image: '' }
    const wrapper = mount(ProductCard, { props: { product } })
    expect(wrapper.text()).toMatch(/ریال/)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('add')).toBeTruthy()
  })
})
