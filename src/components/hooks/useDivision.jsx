import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useDivision = () => {
    const axiosPublic = useAxiosPublic();
    const {data: division } = useQuery({
        queryKey: [],
        queryFn: async() => {
            const res = await axiosPublic.get("/division")
            return res.data;
        }
    })

    return [ division ];
};

export default useDivision;