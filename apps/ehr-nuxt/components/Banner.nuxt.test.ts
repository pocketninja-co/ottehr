import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Banner from './Banner.vue' // Assuming Banner.vue is in the same directory or path is adjusted

describe('Banner.vue', () => {
  it('renders the banner text passed via props', () => {
    const testText = 'This is a test banner message'
    const wrapper = mount(Banner, {
      props: {
        text: testText,
      },
    })
    expect(wrapper.text()).toContain(testText)
  })

  it('displays an info icon placeholder when icon prop is "info"', () => {
    const wrapper = mount(Banner, {
      props: {
        text: 'Info banner',
        icon: 'info',
      },
    })
    expect(wrapper.text()).toContain('(i)')
  })

  it('displays a warning icon placeholder when icon prop is "warning"', () => {
    const wrapper = mount(Banner, {
      props: {
        text: 'Warning banner',
        icon: 'warning',
      },
    })
    expect(wrapper.text()).toContain('(!)')
  })

  it('applies default background and text color classes', () => {
    const wrapper = mount(Banner, {
      props: {
        text: 'Default color banner',
      },
    })
    // Default props are bgcolor: 'bg-blue-500', color: 'text-white'
    expect(wrapper.classes()).toContain('bg-blue-500')
    expect(wrapper.classes()).toContain('text-white')
  })

  it('applies specified background and text color classes from props', () => {
    const bgColor = 'bg-red-600'
    const textColor = 'text-yellow-300'
    const wrapper = mount(Banner, {
      props: {
        text: 'Custom color banner',
        bgcolor: bgColor,
        color: textColor,
      },
    })
    expect(wrapper.classes()).toContain(bgColor)
    expect(wrapper.classes()).toContain(textColor)
  })

  it('applies height class from props', () => {
    const height = 'h-20'
    const wrapper = mount(Banner, {
      props: {
        text: 'Custom height banner',
        height: height,
      },
    })
    expect(wrapper.classes()).toContain(height)
  })

  it('applies icon size class based on prop', () => {
    const wrapper = mount(Banner, {
      props: {
        text: 'Small icon banner',
        icon: 'info',
        iconSize: 'small',
      },
    })
    // Icon span has 'text-xs' for small
    const iconSpan = wrapper.find('span') // First span should be the icon
    expect(iconSpan.exists()).toBe(true)
    if (iconSpan.exists()) {
      expect(iconSpan.classes()).toContain('text-xs')
    }
  })
})
