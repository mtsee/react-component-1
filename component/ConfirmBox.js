const React = require('react');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');
const PopUpMixin = require('./mixin/PopUpMixin');

const ConfirmBox = React.createClass({
    mixins: [DocumentClickMixin, PopUpMixin],

    propTypes: {
        onCancel: React.PropTypes.func,
        onConfirm: React.PropTypes.func,
        force: React.PropTypes.bool,
        content: React.PropTypes.element.isRequired,
        confirmBtn: React.PropTypes.element,
        cancelBtn: React.PropTypes.element,
    },

    closeConfirm(){
        this.setState({
            open: false 
        });
    },

    getDefaultProps() {
        return {
            className: '',
        };
    },

    onOtherDomClick(e){
        if (!this.props.force) this.closeConfirm();
    },

    handleCancel(){
        const {onCancel} = this.props;
        if (!onCancel) return this.closeConfirm();
        if(onCancel()) this.closeConfirm();
    },

    handleConfirm(){
        const {onConfirm} = this.props;
        if (!onConfirm) return this.closeConfirm();
        if (onConfirm()) this.closeConfirm();
    },

    render() {
        let {confirmBtn, cancelBtn, position, className, content, style, children} = this.props;
        const {open} = this.state;
        className = `ui confirm-box popup ${className}`;
        if (open) className = `${className} _active`;

        return (
            <span className={className} style={style} onClick={this.onTrigger}>
                <span className="_trigger" ref='trigger'>
                    {children}
                </span>
                <div className={'_wrap _' + position}>
                    <div ref='content' className='_content'>
                        <div className="_title">{content}</div>
                        <div className="_action">
                            <div className="_confirm" onClick={this.handleConfirm}>
                                {confirmBtn ?
                                    confirmBtn
                                    : <div>ok</div>}
                            </div>
                            <div className="_cancel" onClick={this.handleCancel}>
                                {cancelBtn ?
                                    cancelBtn
                                    : <div>cancel</div>}
                            </div>
                        </div>
                        <span className="_arrow" ref='arrow'></span>
                    </div>
                </div>
            </span>
        );
    }
});

module.exports = ConfirmBox;
