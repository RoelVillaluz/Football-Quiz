function StatusNotification ({ type, object, action, visible }) {
    // type: type of model (player, club)
    // name: player or club object
    // action: post, edit, delete

    return (
        <div className={`notification ${visible ? 'show' : 'hidden' }`}>
            <img src={`http://localhost:5000${object.image}`} alt="" />
            <div>
                <h3>{ object.name }</h3>
                <span>{type} {action} successfully</span>
            </div>
        </div>
    )
}

export default StatusNotification