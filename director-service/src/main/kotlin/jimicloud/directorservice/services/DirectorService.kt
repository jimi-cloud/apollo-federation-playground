package jimicloud.directorservice.services

import com.netflix.dgs.codegen.generated.types.Director
import org.springframework.stereotype.Service

@Service
class DirectorService {

    fun getDirectors(): List<Director> {
        return listOf(Director("1", "James Cameron", "1"), Director("2", "Lana Wachowski", "2"))
    }
}