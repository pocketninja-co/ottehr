import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RoundedButton from './RoundedButton.vue'
import { defineComponent } from 'vue'

// Mock NuxtLink for testing purposes
const NuxtLinkMock = defineComponent({
  name: 'NuxtLink',
  props: ['to', 'target'],
  template: '<a :href="to" :target="target"><slot /></a>',
})

describe('RoundedButton.vue', () => {
  it('renders button text using slot', () => {
    const buttonText = 'Click Me'
    const wrapper = mount(RoundedButton, {
      slots: {
        default: buttonText,
      },
      global: {
        stubs: {
          NuxtLink: NuxtLinkMock, // Stub NuxtLink
        },
      },
    })
    expect(wrapper.text()).toBe(buttonText)
  })

  it('renders as a <button> by default', () => {
    const wrapper = mount(RoundedButton, {
      slots: { default: 'Test' },
      global: { stubs: { NuxtLink: NuxtLinkMock } },
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('a').exists()).toBe(false)
  })

  it('emits a click event when clicked (as a button)', async () => {
    const wrapper = mount(RoundedButton, {
      slots: { default: 'Test Button' },
      global: { stubs: { NuxtLink: NuxtLinkMock } },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
    expect(wrapper.emitted().click?.length).toBe(1)
  })

  it('does not emit click event when disabled (as a button)', async () => {
    const wrapper = mount(RoundedButton, {
      props: { disabled: true },
      slots: { default: 'Disabled Button' },
      global: { stubs: { NuxtLink: NuxtLinkMock } },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })

  it('renders as an <a> tag (via NuxtLink stub) when "to" prop is provided', () => {
    const toPath = '/some/path'
    const wrapper = mount(RoundedButton, {
      props: {
        to: toPath,
      },
      slots: {
        default: 'Link Button',
      },
      global: {
        stubs: {
          NuxtLink: NuxtLinkMock,
        },
      },
    })
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.find('a').attributes('href')).toBe(toPath)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('applies default variant and size classes', () => {
    const wrapper = mount(RoundedButton, {
      slots: { default: 'Default' },
      global: { stubs: { NuxtLink: NuxtLinkMock } },
    })
    // Defaults: variant='outlined', size='medium', color='primary'
    expect(wrapper.classes()).toContain('border') // From outlined
    expect(wrapper.classes()).toContain('border-blue-600') // Primary outlined
    expect(wrapper.classes()).toContain('px-4') // Medium size
    expect(wrapper.classes()).toContain('py-2') // Medium size
  })

  it('applies classes for "filled" variant and "large" size', () => {
    const wrapper = mount(RoundedButton, {
      props: {
        variant: 'filled',
        size: 'large',
        color: 'secondary',
      },
      slots: { default: 'Filled Large' },
      global: { stubs: { NuxtLink: NuxtLinkMock } },
    })
    expect(wrapper.classes()).toContain('bg-gray-600') // Secondary filled
    expect(wrapper.classes()).toContain('text-white')  // Secondary filled
    expect(wrapper.classes()).toContain('px-6') // Large size
    expect(wrapper.classes()).toContain('py-3') // Large size
  })

  it('applies disabled classes and attributes', () => {
    const wrapper = mount(RoundedButton, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
      global: { stubs: { NuxtLink: NuxtLinkMock } },
    })
    expect(wrapper.classes()).toContain('opacity-50')
    expect(wrapper.classes()).toContain('cursor-not-allowed')
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('renders NuxtLink with target attribute when target prop is provided', () => {
    const wrapper = mount(RoundedButton, {
      props: { to: '/external', target: '_blank' },
      slots: { default: 'External Link' },
      global: {
        stubs: { NuxtLink: NuxtLinkMock },
      },
    })
    const link = wrapper.findComponent(NuxtLinkMock)
    expect(link.exists()).toBe(true)
    expect(link.props('target')).toBe('_blank')
    // Check rendered 'a' tag from stub
    expect(wrapper.find('a').attributes('target')).toBe('_blank');
  })
})
