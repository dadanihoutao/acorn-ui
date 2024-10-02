import { beforeAll, describe, expect, test, vi, it } from 'vitest'
import { DOMWrapper, mount, type VueWrapper } from '@vue/test-utils'
import transitionEvents from './transitionEvents'

import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

const onChange = vi.fn()

let wrapper: VueWrapper, headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]

let firstHeader: DOMWrapper<Element>,
  secondHeader: DOMWrapper<Element>,
  disabledHeader: DOMWrapper<Element>,
  firstContent: DOMWrapper<Element>,
  secondContent: DOMWrapper<Element>,
  disabledContent: DOMWrapper<Element>

describe('Collapse.vue', () => {
  beforeAll(() => {
    wrapper = mount(
      () => (
        <Collapse modelValue={['a']} {...{ onChange }}>
          <CollapseItem name="a" title="title a">
            content a
          </CollapseItem>
          <CollapseItem name="b" title="title b">
            content b
          </CollapseItem>
          <CollapseItem name="c" title="title c" disabled>
            content c
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ['AIcon']
        },
        attachTo: document.body
      }
    )

    headers = wrapper.findAll('.a-collapse-item__header')
    contents = wrapper.findAll('.a-collapse-item__wrapper')

    firstHeader = headers[0]
    secondHeader = headers[1]
    disabledHeader = headers[2]

    firstContent = contents[0]
    secondContent = contents[1]
    disabledContent = contents[2]
  })

  test('测试基础结构以及对应文本', () => {
    // length
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    // title
    expect(firstHeader.text()).toBe('title a')

    // content
    expect(firstHeader.classes()).toContain('is-active')
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondHeader.classes()).not.toContain('is-active')
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')
    expect(secondContent.text()).toBe('content b')
  })

  test('点击标题展开/关闭内容', async () => {
    // 点击事件
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondHeader.classes()).toContain('is-active')
    expect(secondContent.isVisible()).toBeTruthy()
    expect(firstHeader.classes()).not.toContain('is-active')
    expect(firstContent.isVisible()).toBeFalsy()
  })

  test('发送正确的事件', () => {
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })

  test('disabled 内容', async () => {
    // disabled
    expect(disabledHeader.classes()).toContain('is-disabled')
    onChange.mockClear()
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
    expect(onChange).not.toHaveBeenCalled()
  })

  test('modelValue 变更', async () => {
    wrapper.setValue(['b'], 'modelValue')
    await wrapper.vm.$nextTick()
    expect(secondHeader.classes()).toContain('is-active')
    expect(firstHeader.classes()).not.toContain('is-active')
  })

  test('手风琴模式', async () => {
    wrapper = mount(
      () => (
        <Collapse accordion modelValue={['a']} {...{ onChange }}>
          <CollapseItem name="a" title="title a">
            content a
          </CollapseItem>
          <CollapseItem name="b" title="title b">
            content b
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ['AIcon']
        },
        attachTo: document.body
      }
    )

    headers = wrapper.findAll('.a-collapse-item__header')
    contents = wrapper.findAll('.a-collapse-item__wapper')

    firstHeader = headers[0]
    secondHeader = headers[1]

    firstContent = contents[0]
    secondContent = contents[1]

    await firstHeader.trigger('click')
    await secondHeader.trigger('click')
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith(['b'])
    expect(firstHeader.classes()).not.toContain('is-active')
    expect(secondHeader.classes()).toContain('is-active')
  })

  test('手风琴模式 错误处理', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    mount(
      () => (
        <Collapse accordion modelValue={['a', 'b']} {...{ onChange }}>
          <CollapseItem name="a" title="title a">
            content a
          </CollapseItem>
          <CollapseItem name="b" title="title b">
            content b
          </CollapseItem>
          <CollapseItem name="c" title="title c" disabled>
            content c
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ['AIcon']
        }
      }
    )
    expect(warn.mock.calls).toMatchInlineSnapshot(
      `
        [
          [
            [AUIError: [ACollapse] accordion mode should only have one active item],
          ],
        ]
      `
    )
  })
})

const createElement = () => {
  return {
    style: {
      height: '',
      overflow: ''
    },
    scrollHeight: 100 // 假设的 scrollHeight
  } as HTMLElement
}

describe('Collapse/transitionEvents', () => {
  it('beforeEnter', () => {
    const el = createElement()
    transitionEvents.beforeEnter(el)
    expect(el.style.height).toBe('0px')
    expect(el.style.overflow).toBe('hidden')
  })

  it('enter', () => {
    const el = createElement()
    transitionEvents.enter(el)
    expect(el.style.height).toBe('100px') // 100 是假设的 scrollHeight
  })

  it('afterEnter', () => {
    const el = createElement()
    transitionEvents.afterEnter(el)
    expect(el.style.height).toBe('')
    expect(el.style.overflow).toBe('')
  })

  it('beforeLeave', () => {
    const el = createElement()
    transitionEvents.beforeLeave(el)
    expect(el.style.height).toBe('100px') // 100 是假设的 scrollHeight
    expect(el.style.overflow).toBe('hidden')
  })

  it('leave', () => {
    const el = createElement()
    transitionEvents.leave(el)
    expect(el.style.height).toBe('0px')
  })

  it('afterLeave', () => {
    const el = createElement()
    transitionEvents.afterLeave(el)
    expect(el.style.height).toBe('')
    expect(el.style.overflow).toBe('')
  })
})
