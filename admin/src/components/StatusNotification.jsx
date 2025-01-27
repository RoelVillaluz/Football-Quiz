import { useEffect, useState } from "react"

function StatusNotification ({ type, object, action, visible, duration=3000 }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (visible) {
            setIsVisible(true)
            const timer = setTimeout(() => setIsVisible(false), duration)
            return () => clearTimeout(timer)
        }
    }, [visible, duration])

    return (
        <div className={`notification ${isVisible ? 'show' : 'hidden' }`}>
            <img src={`http://localhost:5000${object.image}`} alt="" />
            <div>
                <h3>{ object.name }</h3>
                <span>{type} {action} successfully</span>
            </div>
        </div>
    )
}

export default StatusNotification