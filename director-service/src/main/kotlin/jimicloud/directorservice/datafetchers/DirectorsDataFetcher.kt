package jimicloud.directorservice.datafetchers

import com.netflix.graphql.dgs.*
import jimicloud.directorservice.generated.types.Director
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@DgsComponent
class DirectorsDataFetcher {
    val logger : Logger = LoggerFactory.getLogger(DirectorsDataFetcher::class.java)
    val directorData: List<Director> = listOf(Director("1", "James Cameron", "1"), Director("2", "Lana Wachowski", "2"))

    @DgsQuery
    fun directors(): List<Director> {
        return directorData
    }

    @DgsQuery
    fun director(@InputArgument id: String): Director {
        logger.info("Fetching director with id $id")
        logger.info("Director data: $directorData")
        return directorData.find { it.id == id } ?: throw Exception("Director not found")
    }
}