import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateGTD } from '../../../redux/actions/GTDActions'
import http from '../../../config/http'
import { timeTransfer } from '../../../helper/util'
import classNames from 'classnames'

import './GTDsHistoryItem.styl'

interface IGTDsHistoryItemProps {
  GTD: any
  itemType: string
  updateGTD: (payload: any) => void
}

interface IGTDsHistoryItemState {
  editText: string
  deleteText: string
  editable: boolean
  editingText: string
  isEnterCode: boolean
}

export class GTDsHistoryItem extends Component
<IGTDsHistoryItemProps, IGTDsHistoryItemState> {

  constructor(props: IGTDsHistoryItemProps) {
    super(props);
    this.state = {
      editText: '编辑',
      deleteText: '删除',
      editable: false,
      editingText: this.props.GTD.description,
      isEnterCode: false
    }
  }

  update = async (e: any, params: any) => {
    const {id} = this.props.GTD
    try {
      const response = await http.put(`/tomatoes/${id}`, params)
      this.props.updateGTD(response.data.resource)
    } catch (e) {
      throw new Error(e)
    }
  }

  changeActionText = (params: any) => {
    const { submit, className } = params
    if (className === 'edit') {
      submit ? this.changeEditText('提交中...') : this.changeEditText('编辑')
    } else {
      submit ? this.changeDeleteText('提交中...') : this.changeDeleteText('删除')
    }
  }

  changeEditText = (editText: string) => {
    this.setState({ editText })
  }

  changeDeleteText = (deleteText: string) => {
    this.setState({ deleteText })
  }

  onEditClick = (e: any) => {
    const { description } = this.props.GTD
    this.setState({ editable: true, editingText: description || undefined })
    this.changeEditText('提交')
    this.changeDeleteText('取消')
  }

  onDeleteClick = (e: any) => {
    const { description, aborted } = this.props.GTD
    this.update(e, {
      description, aborted,
      extra: { deleted: true }
    })
  }

  onSubmitClick = (e: any) => {
    this.update(e, {
      description: this.state.editingText,
      aborted: this.props.itemType === 'aborted'
    })
    this.setState({editable: false})
    this.changeEditText('编辑')
    this.changeDeleteText('删除')
  }

  onCancelClick = (e: any) => {
    this.setState({ editable: false })
    this.changeEditText('编辑')
    this.changeDeleteText('删除')
  }

  onEditingChange = (e: any) => {
    // 先触发 resize 后触发 render
    // 避免两次渲染造成的内容抖动
    !this.state.isEnterCode && this.resize()
    this.setState({ editingText: e.target.value })
  }

  onEditingKeyDown = (e: any) => {
    if (e.keyCode === 13 && this.state.editingText !== '') {
      this.setState({ editable: false, isEnterCode: true })
      this.changeEditText('编辑')
      this.changeDeleteText('删除')
      this.update(e, {
        description: this.state.editingText,
        aborted: this.props.itemType === 'aborted'
      })
    }
  }

  onEditingFocus = (e: any) => {
    this.resize()
  }

  // textarea resize 参考
  // https://www.jianshu.com/p/2fab017977bb
  resize = ()=> {
    if (this.inputRef) {
      const { current } = this.inputRef
      const { style } = current as any
      style!.height = 'auto'
      style!.height = (current!.scrollHeight) + 'px'
    }
  }

  inputRef = React.createRef<HTMLTextAreaElement>()

  render() {
    const { updated_at, created_at, description, manually_created } = this.props.GTD
    const { itemType } = this.props
    const formatText = 'HH:mm'

    const desc = manually_created
      ? <p className="supply"><span>{description}</span><span className="supply-info">（补）</span></p>
      : description

    const normalDescription = <div className="description">
      {/* eslint-disable-next-line */}
      {desc || <span className="null">描述为空</span>}
    </div>
    const inputDescription = <textarea
      ref={this.inputRef}
      rows={1} cols={30}
      className="editing-input"
      value={this.state.editingText}
      onChange={e => this.onEditingChange(e)}
      onKeyDown={e => this.onEditingKeyDown(e)}
      onFocus={e => this.onEditingFocus(e)}
    />

    const normalAction = <div className="action">
      <span className="edit" onClick={e => this.onEditClick(e)}>
        {this.state.editText}
      </span>
      <span className="delete" onClick={e => this.onDeleteClick(e)}>
        {this.state.deleteText}
      </span>
    </div>

    const inputAction = <div className="action">
      <span className="submit" onClick={e => this.onSubmitClick(e)}>
        {this.state.editText}
      </span>
      <span className="cancel" onClick={e => this.onCancelClick(e)}>
        {this.state.deleteText}
      </span>
    </div>

    const Description = this.state.editable ? inputDescription : normalDescription
    const Action = this.state.editable ? inputAction : normalAction

    const GTDHistoryItemClasses = classNames({
      GTDsHistoryItem: true,
      editable: this.state.editable
    })

    return (
      <div className={GTDHistoryItemClasses}>
        <div className="text">
          <p className="time">
            {timeTransfer(created_at, formatText, itemType)}
            <span> - </span>
            {timeTransfer(updated_at, formatText, itemType)}
          </p>
          { Description }
        </div>
        { Action }
      </div>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps
})

const mapDispatchToProps = {
  updateGTD
}

export default connect(mapStateToProps, mapDispatchToProps)(GTDsHistoryItem)
