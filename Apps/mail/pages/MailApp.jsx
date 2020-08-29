const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import 'assets/css/mail-style.css'
import { SideMenu } from '../cmps/SideMenu.jsx'
import { MailList } from 'MailList.jsx'
import { mailService } from '../services/mail-service.js'
import  {eventBus}  from '../../../../services/event-bus-service.js'
import { Modal } from '../../../../general-cmps/Modal.jsx'
import { NewMail } from '../cmps/NewMail.jsx'
import { MailData } from 'MailData.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { Notification } from '../../../general-cmps/Notification.jsx'

export class MailApp extends React.Component {


    state = {
        mails: [],
        isModalShown: false,
        openMail: null,
        ismailClicked: false
    }

    loadMails = () => {
        mailService.query()
            .then(_mails => this.setState({ mails: _mails }))
    }

    onAddNewMail = (mail) => {
        mailService.addMail(mail);
        this.loadMails();
        eventBus.emit('notify', { msg: 'Mail Was Sent', type: 'success' })
    }

    onOpenModal = () => {
        this.setState({ isModalShown: !this.state.isModalShown });
    }

    render() {
        console.log('render in home', this.state.isModalShown)
        return (
            <section>
                <h2 className="mail-header">
                    Mail
                </h2>
                <div className="mailapp-container flex-row">
                    <SideMenu onOpenModal={this.onOpenModal} />
                    <Switch>
                        <Route component={MailData} exact path="/mail/list/:id" />
                        <Route component={MailList} path="/mail/list" />
                    </Switch>
                </div>
                <Modal isShown={this.state.isModalShown} toggleModal={this.onOpenModal}
                    children={<NewMail onAddNewMail={this.onAddNewMail} toggleModal={this.onOpenModal} />} />
                <Notification />
            </section>
        )
    }
}