import Skeleton from '@material-ui/lab/Skeleton'

const SkeletonLoader = ({ height, width, marginLeft,margin }) => {
    return [...Array(12).keys()].map((item) => (
        <h1>
            <Skeleton
                key={item}
                inline
                height={height}
                width={width}
                style={{ marginBottom: margin,marginLeft:'10px' }}
            ></Skeleton>
        </h1>
    ))
}

export default SkeletonLoader